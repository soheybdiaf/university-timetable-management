import Cs_Shceduler from '../config/Mysql_DB.js';

const GET_STATISTIQUES = async (Demande, Reponse) => {
  try {
    const SQL_GET = `SELECT 
                        (SELECT COUNT(id_enseignant) FROM enseignant) AS Teachers,
                        (SELECT COUNT(id_etudiant) FROM etudiant) AS STUDENTS,
                        (SELECT COUNT(id_niveau) FROM niveau) AS LEVELS,
                        (SELECT COUNT(id_groupe) FROM groupe) AS GROUPES;`;

    const [DashboardStatistiques] = await Cs_Shceduler.execute(SQL_GET);

    if (DashboardStatistiques.length > 0)
      return Reponse.status(200).json(DashboardStatistiques);
    else return Reponse.status(400).json({ message: 'no result exists' });
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const Groupes_Stat = async (Demande, Reponse) => {
  try {
    const { levelId, Semester } = Demande.params;

    const SqlGetStat = Cs_Shceduler.format(`SELECT
                          nom_groupe,
                          @total := (
                            SELECT SUM(nombre_td + nombre_tp + nombre_cours) FROM module
                            WHERE niveau_module = niveau_groupe AND semester_module=${Semester}
                          ) AS nb_seance,
                          @total - (
                            SELECT COUNT(*) FROM seance
                            WHERE semester_seance=${Semester} AND (groupe_id=id_groupe OR (niveau_id=niveau_groupe AND groupe_id IS NULL))
                          ) AS nb_restantes
                        FROM groupe
                        WHERE niveau_groupe=${levelId};`);

    const [GroupesStat] = await Cs_Shceduler.execute(SqlGetStat);

    if (GroupesStat.length)
      return Reponse.status(200).json({ success: true, data: GroupesStat });
    else
      return Reponse.status(400).json({
        success: false,
        message: 'no data received',
      });
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const Get_Enseignants = async (Demande, Reponse) => {
  try {
    const SqlGetEnseignants = Cs_Shceduler.format(
      `SELECT DISTINCT
                                  e.id_enseignant,
                                  e.nom_complet
                                FROM enseignant e
                                JOIN module_enseignant mo ON e.id_enseignant=mo.enseignant_id;`,
    );

    const [EnseignantsList] = await Cs_Shceduler.execute(SqlGetEnseignants);

    if (EnseignantsList.length)
      return Reponse.status(200).json({ success: true, data: EnseignantsList });
    else
      return Reponse.status(400).json({
        success: false,
        message: 'no data received',
      });
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const Enseignant_Stat = async (Demande, Reponse) => {
  try {
    const { enseignantId, semester } = Demande.params;

    const SqlGetStat = Cs_Shceduler.format(
      `SELECT
                                    e.nom_complet,
                                    COUNT(se.id_seance) AS nb_reserved,
                                    16 - COUNT(se.id_seance) AS nb_restant
                                    FROM enseignant e
                                    LEFT JOIN seance se ON se.enseignant_id=e.id_enseignant AND se.semester_seance=?
                                    WHERE e.id_enseignant=?`,
      [semester, enseignantId],
    );

    const [[EnseignantStat]] = await Cs_Shceduler.execute(SqlGetStat);

    if (EnseignantStat) {
      return Reponse.status(200).json({
        success: true,
        data: {
          nom_complet: EnseignantStat.nom_complet,
          nb_restant: EnseignantStat.nb_restant,
          nb_reserved: EnseignantStat.nb_reserved,
        },
      });
    } else
      return Reponse.status(400).json({
        success: false,
        message: 'no data received',
      });
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

export { GET_STATISTIQUES, Groupes_Stat, Get_Enseignants, Enseignant_Stat };
