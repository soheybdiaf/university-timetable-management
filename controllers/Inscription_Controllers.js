import Cs_Shceduler from '../config/Mysql_DB.js';
import md5 from 'md5';

const Teacher_Register = async (Demande, Reponse) => {
  try {
    const { matricule, nom_complet, departement, email, username, mot_passe } =
      Demande.body;

    const SQL_CheckUser = `SELECT * FROM enseignant WHERE email=? AND username=?`;

    const [TeacherExist] = await Cs_Shceduler.execute(SQL_CheckUser, [email, username]);

    if (TeacherExist?.length > 0)
      return Reponse.status(400).json({ message: 'teacher already exist' });

    const SqlInsertTeacher = `INSERT INTO enseignant (nom_complet, username, mot_passe, matricule, email, departement, role)
                                  VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const [TeacherSubmited] = await Cs_Shceduler.execute(SqlInsertTeacher, [
      nom_complet,
      username,
      md5(mot_passe),
      matricule,
      email,
      departement,
      'enseignant',
    ]);

    if (TeacherSubmited.affectedRows === 1)
      Reponse.status(200).json({
        success: true,
        message: 'Successfully registered teacher',
      });
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const Student_Register = async (Demande, Reponse) => {
  try {
    const { matricule, nom_complet, email, username, mot_passe, group_id } = Demande.body;

    const SQL_CheckUser = `SELECT * FROM etudiant WHERE email=? AND username=?`;

    const [StudentExist] = await Cs_Shceduler.execute(SQL_CheckUser, [email, username]);

    if (StudentExist?.length > 0)
      return Reponse.status(400).json({ message: 'etudiant already exist' });

    const SqlInsertStudent = Cs_Shceduler.format(
      `INSERT INTO etudiant
                                 (nom_complet, username, mot_passe, matricule, email, group_id, role)
                                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nom_complet, username, md5(mot_passe), matricule, email, group_id, 'etudiant'],
    );

    const [StudentSubmited] = await Cs_Shceduler.execute(SqlInsertStudent);

    if (StudentSubmited.affectedRows === 1)
      Reponse.status(200).json({
        success: true,
        message: 'Successfully registered etudiant',
      });
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const getLevels = async (Demande, Reponse) => {
  try {
    const sql = 'SELECT id_niveau ,nom_niveau FROM niveau';

    const [ARRAY_NIVEAUX] = await Cs_Shceduler.execute(sql);

    Reponse.json(ARRAY_NIVEAUX);
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const getGroupes = async (Demande, Reponse) => {
  try {
    const ID_NIVEAU = Demande.params.niveau_id;

    const sql = `SELECT g.id_groupe ,g.nom_groupe 
                     FROM groupe g JOIN niveau n  ON g.niveau_groupe = n.id_niveau WHERE n.id_niveau =?`;

    const [GROUPES] = await Cs_Shceduler.execute(sql, [ID_NIVEAU]);

    Reponse.json(GROUPES);
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

export { Teacher_Register, Student_Register, getLevels, getGroupes };
