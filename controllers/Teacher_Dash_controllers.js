import Cs_Shceduler from '../config/Mysql_DB.js';
import md5 from 'md5';

const GetTeacherInfo = async (Demande, Reponse) => {
  try {
    const { Username } = Demande.params;

    const SqlGetTeacher = `SELECT id_enseignant,matricule,email,nom_complet,username,departement,jours_preferes,horaires_preferes
                           FROM enseignant WHERE username=?;`;

    const [[TEACHER]] = await Cs_Shceduler.execute(SqlGetTeacher, [Username]);

    if (TEACHER) return Reponse.status(200).json(TEACHER);
    else return Reponse.status(400).json({ message: 'teacher not exists' });
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const GetTeacherStatistics = async (Demande, Reponse) => {
  try {
    const { teacherId } = Demande.params;

    const teacherStatistics = new Object();

    const [groupes] = await Cs_Shceduler.execute(
      `SELECT DISTINCT
          g.nom_groupe,
          se.semester_seance
          FROM seance se
          JOIN groupe g ON g.id_groupe=se.groupe_id
          WHERE se.enseignant_id=? AND se.groupe_id IS NOT null;`,
      [teacherId],
    );

    const [module] = await Cs_Shceduler.execute(
      `SELECT DISTINCT
          m.nom_module,
          m.semester_module
          FROM module_enseignant me
          JOIN module m ON me.module_id=m.id_module
          WHERE me.enseignant_id=?;`,
      [teacherId],
    );

    const [[{ Hours_S1 }]] = await Cs_Shceduler.execute(
      `SELECT COUNT(*) AS Hours_S1 FROM seance WHERE enseignant_id=? AND semester_seance=1;`,
      [teacherId],
    );

    const [[{ Hours_S2 }]] = await Cs_Shceduler.execute(
      `SELECT COUNT(*) AS Hours_S2 FROM seance WHERE enseignant_id=? AND semester_seance=2;`,
      [teacherId],
    );

    teacherStatistics['module_S1'] = module?.filter((mod) => mod.semester_module === 1);
    teacherStatistics['module_S2'] = module?.filter((mod) => mod.semester_module === 2);
    teacherStatistics['group_Count_S1'] =
      groupes?.filter((gr) => gr.semester_seance === 1) ?? 0;
    teacherStatistics['group_Count_S2'] =
      groupes?.filter((gr) => gr.semester_seance === 2) ?? 0;
    teacherStatistics['teaching_Hours_S1'] = Hours_S1 ?? 0;
    teacherStatistics['teaching_Hours_S2'] = Hours_S2 ?? 0;

    return Reponse.status(200).json(teacherStatistics);
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const PostTeacherPreferencesTimes = async (Demande, Reponse) => {
  try {
    const { jours_preferes, horaires_preferes, teacherId } = Demande.body;

    const sqlPostPreferences = Cs_Shceduler.format(
      `UPDATE enseignant
   SET jours_preferes=?, horaires_preferes =? WHERE id_enseignant=?;`,
      [jours_preferes.join(','), horaires_preferes.join(','), teacherId],
    );

    const [postedPreferences] = await Cs_Shceduler.execute(sqlPostPreferences);

    if (postedPreferences && postedPreferences.affectedRows === 1)
      return Reponse.status(200).json({
        success: true,
        message: 'Preferences Times Is Posted successfully',
      });
    else
      Reponse.status(400).json({
        success: false,
        message: 'data Not Posted successfully',
      });
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const PostTeacherPreferencesModules = async (Demande, Reponse) => {
  try {
    const { teacherId, module } = Demande.body;

    const sqlSubmitModulePreference = `UPDATE enseignant SET module_preferes=? WHERE id_enseignant=?;`;

    const [postedModulePreference] = await Cs_Shceduler.execute(
      sqlSubmitModulePreference,
      [module, teacherId],
    );

    if (postedModulePreference.affectedRows)
      return Reponse.status(200).json({
        success: true,
        message: 'Preferences Modules Is Posted successfully',
      });
    else
      Reponse.status(400).json({
        success: false,
        message: 'data Not Posted successfully',
      });
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const searchModulesByCharacters = async (Demande, Reponse) => {
  try {
    const { query } = Demande.query;

    const sqlsearchModules = Cs_Shceduler.format(
      `SELECT nom_module FROM module WHERE nom_module LIKE ? LIMIT 5;`,
      [`${query}%`],
    );

    const [ModulesByCharacters] = await Cs_Shceduler.execute(sqlsearchModules);

    if (ModulesByCharacters.length) return Reponse.status(200).json(ModulesByCharacters);
    else return Reponse.status(400).json({ message: 'No match' });
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const GetTeacherPreferencesModules = async (Demande, Reponse) => {
  try {
    const { teacherId } = Demande.params;

    const sqlGetModules = Cs_Shceduler.format(
      `SELECT module_preferes FROM enseignant WHERE id_enseignant=?;`,
      [teacherId],
    );

    const [Modules] = await Cs_Shceduler.execute(sqlGetModules);

    if (Modules.length) return Reponse.status(200).json(Modules);
    else return Reponse.status(400).json({ message: 'empty List' });
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const UpdateTeacherProfile = async (Demande, Reponse) => {
  try {
    const { matricule, nom_complet, username, email, departement, currentPass, newPass } =
      Demande.body;

    const isPassChanged = newPass != '';

    const sqlgetPassword = `SELECT mot_passe FROM enseignant  WHERE username=?;`;

    const [[{ mot_passe }]] = await Cs_Shceduler.execute(sqlgetPassword, [username]);

    if (!mot_passe) return Reponse.status(400).json({ success: false });

    const matchedPass = mot_passe == md5(currentPass);

    if (!matchedPass)
      return Reponse.status(400).json({
        success: false,
        message: 'Incorrect password',
      });

    const Password = isPassChanged ? md5(newPass) : mot_passe;

    const sqlUpdateInfo = Cs_Shceduler.format(
      `UPDATE enseignant SET
     matricule=?, nom_complet=?, username=?, email=?, departement=?, mot_passe=?
     WHERE username=?;`,
      [matricule, nom_complet, username, email, departement, Password, username],
    );

    const [infoUpdated] = await Cs_Shceduler.execute(sqlUpdateInfo);

    if (infoUpdated.affectedRows)
      return Reponse.status(400).json({
        success: true,
        message: 'Information updated successfully',
      });
    else
      return Reponse.status(400).json({
        success: false,
        message: 'Information not updated, please try again',
      });
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

export {
  GetTeacherInfo,
  GetTeacherStatistics,
  PostTeacherPreferencesTimes,
  GetTeacherPreferencesModules,
  UpdateTeacherProfile,
  PostTeacherPreferencesModules,
  searchModulesByCharacters,
};
