import Cs_Shceduler from '../config/Mysql_DB.js';

const GET_SUBJECT_BY_LEVEL = async (Demande, Reponse) => {
  try {
    const { semestre, level } = Demande.query;

    const SQL_GET = `SELECT id_module,nom_module FROM module
                       WHERE (niveau_module=? && semester_module=?);`;

    const [SUBJECTS_NULL] = await Cs_Shceduler.execute(SQL_GET, [level, semestre]);

    if (SUBJECTS_NULL.length) return Reponse.status(200).json(SUBJECTS_NULL);
    else return Reponse.status(400).json({ message: 'SUBJECTS not exists' });
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const GET_TEACHERS_BY_SUBJECTS = async (Demande, Reponse) => {
  try {
    const { subjectId } = Demande.query;

    const SQL_GET = `SELECT DISTINCT
                      em.enseignant_id,
                      e.nom_complet
                      FROM module_enseignant em
                      JOIN enseignant e ON em.enseignant_id=e.id_enseignant
                      WHERE module_id=?;`;

    const [TeachersBySubjects] = await Cs_Shceduler.execute(SQL_GET, [subjectId]);

    if (TeachersBySubjects.length) return Reponse.status(200).json(TeachersBySubjects);
    else return Reponse.status(400).json({ message: 'Teachers not exists' });
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const GET_TYPES_SUBJECT = async (Demande, Reponse) => {
  try {
    const { ID_TEACHER, ID_SUBJECT } = Demande.query;

    const [subjectDetails] = await Cs_Shceduler.execute(
      `SELECT nombre_td, nombre_tp, nombre_cours FROM module WHERE id_module = ?;`,
      [ID_SUBJECT],
    );

    const [ReservedByTeacher] = await Cs_Shceduler.execute(
      `SELECT type_module FROM module_enseignant WHERE module_id = ? AND enseignant_id = ?;`,
      [ID_SUBJECT, ID_TEACHER],
    );

    const [[isCourseReserved]] = await Cs_Shceduler.execute(
      `SELECT type_module FROM module_enseignant WHERE module_id = ? AND type_module = 'courses';`,
      [ID_SUBJECT],
    );

    const subjectTypes = subjectDetails.reduce((acc, t) => {
      if (t['nombre_td']) acc.push('supervised_work');
      if (t['nombre_tp']) acc.push('pratical_work');
      if (t['nombre_cours']) acc.push('courses');
      return acc;
    }, []);

    const typesReserved = ReservedByTeacher.map((item) => item.type_module);

    const Available = subjectTypes.filter(
      (t) =>
        !(isCourseReserved && t === isCourseReserved['type_module']) &&
        !(typesReserved.length && typesReserved.includes(t)),
    );

    return Reponse.status(200).json(Available);
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const POST_SUBJECTS_TEACHERS = async (Demande, Reponse) => {
  try {
    const { array } = Demande.body;

    const SQL_CREATE = Cs_Shceduler.format(
      `INSERT INTO module_enseignant (enseignant_id, module_id, type_module) VALUES ?`,
      [array],
    );

    const [Subjects_teachers] = await Cs_Shceduler.execute(SQL_CREATE);

    if (Subjects_teachers && Subjects_teachers.affectedRows === array.length)
      return Reponse.status(200).json({
        isSuccess: true,
        message: `Data has been Added successfully`,
      });
  } catch (Erreur) {
    return Reponse.status(500).json({ isSuccess: false, message: `${Erreur}` });
  }
};

const DELETE_SUBJECTS_TEACHERS = async (Demande, Reponse) => {
  try {
    const { idTeacher, idSubject, type } = Demande.query;

    const SQL_DELL = Cs_Shceduler.format(
      `DELETE FROM module_enseignant 
                                        WHERE enseignant_id=? AND module_id=? AND type_module =?;`,
      [idTeacher, idSubject, type],
    );

    const [Subjects_deleted] = await Cs_Shceduler.execute(SQL_DELL);

    if (Subjects_deleted.affectedRows === 1)
      return Reponse.status(200).json({ isSuccess: true });
  } catch (Erreur) {
    return Reponse.status(500).json({ isSuccess: false, message: `${Erreur}` });
  }
};

export {
  GET_SUBJECT_BY_LEVEL,
  GET_TEACHERS_BY_SUBJECTS,
  GET_TYPES_SUBJECT,
  POST_SUBJECTS_TEACHERS,
  DELETE_SUBJECTS_TEACHERS,
};
