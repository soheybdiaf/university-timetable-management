import Cs_Shceduler from '../config/Mysql_DB.js';
import md5 from 'md5';

const GET_STUDENTS = async (Demande, Reponse) => {
  try {
    const SQL_GET = `SELECT e.id_etudiant, 
                                e.matricule,
                                e.nom_complet,
                                e.email,
                                e.username,
                                n.nom_niveau,
                                g.nom_groupe
                                FROM etudiant e
                                JOIN groupe g ON g.id_groupe = e.group_id
                                JOIN niveau n ON n.id_niveau = g.niveau_groupe;`;

    const [ARRAY_STUDENTS] = await Cs_Shceduler.execute(SQL_GET);

    if (ARRAY_STUDENTS) return Reponse.status(200).json(ARRAY_STUDENTS);
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const GET_STUDENT_BY_ID = async (Demande, Reponse) => {
  try {
    const { ID_STUDENT } = Demande.params;

    const SQL_GET =
      'SELECT nom_complet,username,matricule FROM etudiant WHERE id_etudiant=?;';

    const [STUDENT] = await Cs_Shceduler.execute(SQL_GET, [ID_STUDENT]);

    if (STUDENT.length === 1) return Reponse.status(200).json(STUDENT);
    else return Reponse.status(400).json({ message: 'student not exists' });
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const POST_STUDENT = async (Demande, Reponse) => {
  try {
    const { matricule, nom_complet, email, username, mot_passe, nom_groupe } =
      Demande.body;

    const SQL_CHECK = `SELECT * FROM etudiant WHERE email = ? OR username = ?`;

    const [ARRAY_USERS] = await Cs_Shceduler.execute(SQL_CHECK, [email, username]);

    if (ARRAY_USERS.length > 0)
      return Reponse.status(400).json({ message: 'student already exists' });

    const SQL_CREATE = `INSERT INTO etudiant (nom_complet,username,mot_passe,matricule,email,group_id,role)
                          VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const [NEW_STUDENT] = await Cs_Shceduler.execute(SQL_CREATE, [
      nom_complet,
      username,
      md5(mot_passe),
      matricule,
      email,
      nom_groupe,
      'etudiant',
    ]);

    if (NEW_STUDENT && NEW_STUDENT.affectedRows === 1)
      return Reponse.status(200).json({
        message: `The student has been Added successfully`,
      });
  } catch (Erreur) {
    return Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const PATCH_STUDENT = async (Demande, Reponse) => {
  try {
    const { ID_STUDENT } = Demande.params;

    const { matricule, nom_complet, username, nom_groupe } = Demande.body;

    const SQL_GET = `SELECT * FROM etudiant
                       WHERE matricule=? AND nom_complet=? AND username=? AND group_id=? AND id_etudiant=?;`;

    const [STUDENT_FETCHED] = await Cs_Shceduler.execute(SQL_GET, [
      matricule,
      nom_complet,
      username,
      nom_groupe,
      ID_STUDENT,
    ]);

    if (STUDENT_FETCHED.length > 0)
      return Reponse.status(400).json({
        message: `The student already exists, at least one field must be changed`,
      });

    const SQL_PATCH = `UPDATE etudiant 
                         SET matricule=?, nom_complet=?, username=?, group_id=? WHERE id_etudiant=?;`;

    const [STUDENT_PATCHED] = await Cs_Shceduler.execute(SQL_PATCH, [
      matricule,
      nom_complet,
      username,
      nom_groupe,
      ID_STUDENT,
    ]);

    if (STUDENT_PATCHED && STUDENT_PATCHED.affectedRows > 0)
      return Reponse.status(200).json({
        message: `The student has been successfully patched from the database`,
      });
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const DELETE_STUDENT = async (Demande, Reponse) => {
  try {
    const { ID_STUDENT } = Demande.params;

    const SQL_DELETE = 'DELETE FROM etudiant WHERE id_etudiant=?;';

    const [STUDENT_DELETED] = await Cs_Shceduler.execute(SQL_DELETE, [ID_STUDENT]);

    if (STUDENT_DELETED && STUDENT_DELETED.affectedRows > 0)
      return Reponse.status(200).json({
        message: `The student has been successfully removed from the database `,
      });
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

export { GET_STUDENTS, GET_STUDENT_BY_ID, POST_STUDENT, DELETE_STUDENT, PATCH_STUDENT };
