import Cs_Shceduler from '../config/Mysql_DB.js';

const GetStudentInfo = async (Demande, Reponse) => {
  try {
    const { Username } = Demande.params;

    const SqlStudentInfo = Cs_Shceduler.format(
      `SELECT 
                            e.id_etudiant,
                            e.nom_complet,
                            e.email,
                            e.matricule,
                            g.id_groupe,
                            g.niveau_groupe,
                            g.specialite_groupe,
                            g.nom_groupe AS Groupe,
                            n.nom_niveau AS LevelStudent,
                            s.nom_specialite AS Specialty
                            FROM etudiant e
                            JOIN groupe g ON g.id_groupe=e.group_id
                            JOIN niveau n ON n.id_niveau=g.niveau_groupe
                            JOIN specialite s ON s.id_specialite=g.specialite_groupe
                            WHERE e.username=?;`,
      [Username],
    );

    const [[StudentInfo]] = await Cs_Shceduler.execute(SqlStudentInfo);

    if (StudentInfo) Reponse.status(200).json(StudentInfo);
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const GetStudySummary = async (Demande, Reponse) => {
  try {
    const { LevelId, GroupeId } = Demande.params;

    const StudySummary = new Object();

    const [studyHours] = await Cs_Shceduler.execute(`SELECT 
        ( SELECT COUNT(*) FROM seance 
        WHERE semester_seance=1 AND ( groupe_id=${GroupeId} OR (niveau_id=${LevelId} AND groupe_id IS NULL) ) ) AS studyHoursS1,
        ( SELECT COUNT(*) FROM seance 
        WHERE semester_seance=2 AND ( groupe_id=${GroupeId} OR (niveau_id=${LevelId} AND groupe_id IS NULL) ) ) AS studyHoursS2;`);

    const [TeachersS1] =
      await Cs_Shceduler.execute(`SELECT DISTINCT e.nom_complet FROM enseignant e
        JOIN seance se ON se.enseignant_id = e.id_enseignant
        WHERE  se.semester_seance=1 AND ( se.groupe_id=${GroupeId} OR (se.groupe_id IS NULL AND se.niveau_id=${LevelId}) );`);

    const [TeachersS2] =
      await Cs_Shceduler.execute(`SELECT DISTINCT e.nom_complet FROM enseignant e
        JOIN seance se ON se.enseignant_id = e.id_enseignant
        WHERE  se.semester_seance=2 AND ( se.groupe_id=${GroupeId} OR (se.groupe_id IS NULL AND se.niveau_id=${LevelId}) );`);

    if (studyHours && TeachersS1 && TeachersS2) {
      const [{ studyHoursS1, studyHoursS2 }] = studyHours;

      StudySummary['studyHoursS1'] = studyHoursS1;
      StudySummary['studyHoursS2'] = studyHoursS2;
      StudySummary['TeachersS1'] = TeachersS1.map((teacher) => teacher.nom_complet);
      StudySummary['TeachersS2'] = TeachersS2.map((teacher) => teacher.nom_complet);

      return Reponse.status(200).json(StudySummary);
    }
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const GetCoursesStatistiques = async (Demande, Reponse) => {
  try {
    const { LevelId, SpecialityId } = Demande.params;

    const [S1] = await Cs_Shceduler.execute(
      `SELECT nom_module, (nombre_cours*1.5) AS Lecture, (nombre_td*1.5) AS Tutorial, (nombre_tp*1.5) AS Practical,
                            ( (nombre_cours+nombre_td+nombre_tp) * 1.5 ) AS Total_Hours
                            FROM module WHERE semester_module=1 AND niveau_module=${LevelId} AND specialite_module=${SpecialityId};`,
    );

    const [S2] = await Cs_Shceduler.execute(
      `SELECT nom_module, (nombre_cours*1.5) AS Lecture, (nombre_td*1.5) AS Tutorial, (nombre_tp*1.5) AS Practical,
                            ( (nombre_cours+nombre_td+nombre_tp) * 1.5 ) AS Total_Hours
                            FROM module WHERE semester_module=2 AND niveau_module=${LevelId} AND specialite_module=${SpecialityId};`,
    );

    if (S1 && S2) return Reponse.status(200).json({ CoursesS1: S1, CoursesS2: S2 });
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

export { GetStudentInfo, GetStudySummary, GetCoursesStatistiques };
