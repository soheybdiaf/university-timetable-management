import Cs_Shceduler from '../config/Mysql_DB.js';

const GET_SUBJECTS = async (Demande, Reponse) => {
  try {
    const SQL_GET_SUBJECT = `SELECT m.id_module,
                                    m.nom_module,
                                    m.semester_module,
                                    n.nom_niveau,
                                    s.nom_specialite,
                                    m.nombre_td,
                                    m.nombre_tp,
                                    m.nombre_cours FROM module m
                                    JOIN niveau n ON m.niveau_module = n.id_niveau
                                    JOIN specialite s ON m.specialite_module = s.id_specialite;`;

    const [ARRAY_SUBJECT] = await Cs_Shceduler.execute(SQL_GET_SUBJECT);

    if (ARRAY_SUBJECT.length === 0)
      return Reponse.status(400).json({ message: 'no subject exist' });
    else return Reponse.status(200).json(ARRAY_SUBJECT);
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const GET_SUBJECT_BY_ID = async (Demande, Reponse) => {
  try {
    const { ID_SUBJECT } = Demande.params;

    const SQL_GET = `SELECT nom_module, semester_module, nombre_td, nombre_tp, nombre_cours
                     FROM module WHERE id_module=?;`;

    const [SUBJECT] = await Cs_Shceduler.execute(SQL_GET, [ID_SUBJECT]);

    if (SUBJECT.length === 1) return Reponse.status(200).json(SUBJECT);
    else return Reponse.status(400).json({ message: 'subject not exists' });
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const POST_SUBJECT = async (Demande, Reponse) => {
  try {
    const {
      nom_module,
      semester_module,
      niveau_module,
      specialite_module,
      nombre_td,
      nombre_tp,
      nombre_cours,
    } = Demande.body;

    const SQL_CHECK = `SELECT * FROM module WHERE nom_module= ?`;

    const [ARRAY_SUBJECT] = await Cs_Shceduler.execute(SQL_CHECK, [nom_module]);

    if (ARRAY_SUBJECT.length > 0)
      return Reponse.status(400).json({
        message: 'subject name already exists',
      });

    const SQL_CREATE = `INSERT INTO module
                          (nom_module,semester_module,niveau_module,specialite_module,nombre_td,nombre_tp,nombre_cours)
                          VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const [NEW_SUBJECT] = await Cs_Shceduler.execute(SQL_CREATE, [
      nom_module,
      semester_module,
      niveau_module,
      specialite_module,
      nombre_td,
      nombre_tp,
      nombre_cours,
    ]);

    if (!NEW_SUBJECT || NEW_SUBJECT.affectedRows === 0)
      return Reponse.status(400).json({ message: 'Something went wrong' });
    else
      return Reponse.status(200).json({
        message: `SUBJECT has been Added successfully`,
      });
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const DELETE_SUBJECT = async (Demande, Reponse) => {
  try {
    const { ID_SUBJECT } = Demande.params;

    const SQL_DELETE = 'DELETE FROM module WHERE id_module=?;';

    const [SUBJECT_DELETED] = await Cs_Shceduler.execute(SQL_DELETE, [ID_SUBJECT]);

    if (!SUBJECT_DELETED || SUBJECT_DELETED.affectedRows === 0)
      return Reponse.status(400).json({ message: 'Something went wrong' });
    else
      return Reponse.status(200).json({
        message: `The SUBJECT has been successfully removed from the database`,
      });
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const PATCH_SUBJECT = async (Demande, Reponse) => {
  try {
    const { ID_SUBJECT } = Demande.params;

    const {
      nom_module,
      semester_module,
      niveau_module,
      specialite_module,
      nombre_td,
      nombre_tp,
      nombre_cours,
    } = Demande.body;

    const SQL_PATCH = `UPDATE module
                       SET nom_module=?, semester_module=?, niveau_module=?, specialite_module=?, nombre_td=?, nombre_tp=?,nombre_cours=?
                       WHERE id_module=?;`;

    const [SUBJECT_PATCHED] = await Cs_Shceduler.execute(SQL_PATCH, [
      nom_module,
      semester_module,
      niveau_module,
      specialite_module,
      nombre_td,
      nombre_tp,
      nombre_cours,
      ID_SUBJECT,
    ]);

    if (!SUBJECT_PATCHED || SUBJECT_PATCHED.affectedRows === 0)
      return Reponse.status(400).json({ message: 'Something went wrong' });
    else
      return Reponse.status(200).json({
        message: `The SUBJECT has been successfully patched from the database`,
      });
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

export { GET_SUBJECTS, GET_SUBJECT_BY_ID, POST_SUBJECT, DELETE_SUBJECT, PATCH_SUBJECT };
