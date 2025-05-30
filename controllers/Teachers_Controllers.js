import Cs_Shceduler from '../config/Mysql_DB.js';
import md5 from 'md5';

const GET_TEACHERS = async (Demande, Reponse) => {
  try {
    const SQL_GET_TEACHERS = `SELECT id_enseignant,matricule,nom_complet,email,module_preferes FROM enseignant;`;

    const [TEACHERS] = await Cs_Shceduler.execute(SQL_GET_TEACHERS);

    if (!TEACHERS) return Reponse.status(400).json({ message: 'no teacher exist' });
    else return Reponse.status(200).json(TEACHERS);
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const GET_TEACHER_BY_ID = async (Demande, Reponse) => {
  try {
    const { ID_TEACHER } = Demande.params;

    const SQL_GET = `SELECT id_enseignant,matricule,nom_complet,username,departement FROM enseignant WHERE id_enseignant=?;`;

    const [TEACHER] = await Cs_Shceduler.execute(SQL_GET, [ID_TEACHER]);

    if (TEACHER.length === 1) return Reponse.status(200).json(TEACHER);
    else return Reponse.status(400).json({ message: 'teacher not exists' });
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const GET_TEACHER_INFO_BY_ID = async (Demande, Reponse) => {
  try {
    const { ID_TEACHER } = Demande.params;

    const SQL_GET_SUBJECTS = `SELECT 
                              em.module_id,
                              m.nom_module,
                              em.type_module,
                              n.nom_niveau
                              FROM module_enseignant em
                              JOIN module m ON em.module_id = m.id_module
                              JOIN niveau n ON m.niveau_module = n.id_niveau
                              WHERE em.enseignant_id =?;`;

    const [TEACHER_SUBJECTS] = await Cs_Shceduler.execute(SQL_GET_SUBJECTS, [ID_TEACHER]);

    if (TEACHER_SUBJECTS.length > 0)
      return Reponse.status(200).json({ array: TEACHER_SUBJECTS });
    else
      return Reponse.status(404).json({
        message: 'teacher subjects not exists',
      });
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const POST_TEACHER = async (Demande, Reponse) => {
  try {
    const { nom_complet, username, mot_passe, matricule, email, departement } =
      Demande.body;

    const SQL_CHECK = `SELECT 1 FROM enseignant WHERE email=? OR username=? OR matricule=?;`;

    const [ARRAY_USERS] = await Cs_Shceduler.execute(SQL_CHECK, [
      email,
      username,
      matricule,
    ]);

    if (ARRAY_USERS.length > 0)
      return Reponse.status(400).json({ message: 'teacher already exists' });

    const SQL_CREATE = `INSERT INTO enseignant (nom_complet, username, mot_passe, matricule, email, departement, role)
                          VALUES (?,?,?,?,?,?,?);`;

    const [NEW_TEACHER] = await Cs_Shceduler.execute(SQL_CREATE, [
      nom_complet,
      username,
      md5(mot_passe),
      matricule,
      email,
      departement,
      'enseignant',
    ]);

    if (NEW_TEACHER && NEW_TEACHER.affectedRows === 1)
      return Reponse.status(200).json({
        message: `The teacher has been Added successfully`,
      });
  } catch (Erreur) {
    return Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const PATCH_TEACHER = async (Demande, Reponse) => {
  try {
    const { ID_TEACHER } = Demande.params;

    const { matricule, nom_complet, username, departement } = Demande.body;

    const SQL_GET = `SELECT * FROM enseignant WHERE matricule=? AND nom_complet=? AND username=? AND departement=? AND id_enseignant=?;`;

    const [TEACHER_FETCHED] = await Cs_Shceduler.execute(SQL_GET, [
      matricule,
      nom_complet,
      username,
      departement,
      ID_TEACHER,
    ]);

    if (TEACHER_FETCHED.length > 0)
      return Reponse.status(400).json({
        message: `teachers already exists, at least one field must be changed`,
      });

    const SQL_PATCH = `UPDATE enseignant SET matricule=?, nom_complet=?, username=?, departement=? WHERE id_enseignant=?;`;

    const [TEACHER_PATCHED] = await Cs_Shceduler.execute(SQL_PATCH, [
      matricule,
      nom_complet,
      username,
      departement,
      ID_TEACHER,
    ]);

    if (TEACHER_PATCHED && TEACHER_PATCHED.affectedRows > 0)
      return Reponse.status(200).json({
        message: `The teacher has been successfully patched from the database`,
      });
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const DELETE_TEACHER = async (Demande, Reponse) => {
  try {
    const { ID_TEACHER } = Demande.params;

    const SQL_DELETE = `DELETE FROM enseignant WHERE id_enseignant=?;`;

    const [TEACHER_DELETED] = await Cs_Shceduler.execute(SQL_DELETE, [ID_TEACHER]);

    if (!TEACHER_DELETED || TEACHER_DELETED.affectedRows === 0)
      return Reponse.status(400).json({ message: 'Something went wrong' });
    else
      return Reponse.status(200).json({
        message: `TEACHER has been successfully removed from the database`,
      });
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

export {
  GET_TEACHERS,
  GET_TEACHER_BY_ID,
  GET_TEACHER_INFO_BY_ID,
  POST_TEACHER,
  DELETE_TEACHER,
  PATCH_TEACHER,
};
