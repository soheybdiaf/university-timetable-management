import Cs_Shceduler from '../config/Mysql_DB.js';

const GroupeScheduler = async (Demande, Reponse) => {
  try {
    const { Semester, Level, Groupe } = Demande.query;

    const SqlTimeGroupe = `SELECT se.id_seance, se.jour_id, se.horaire_id, se.type_seance, m.nom_module, e.nom_complet, s.nom_salle
                             FROM seance se
                             JOIN module m ON se.module_id=m.id_module
                             JOIN enseignant e ON se.enseignant_id=e.id_enseignant
                             LEFT JOIN salle s ON se.salle_id=s.id_salle
                             WHERE semester_seance=? && ( groupe_id=? || (niveau_id=${Level} && groupe_id IS null))
                             ORDER BY se.jour_id ASC, se.horaire_id ASC;`;

    const [GroupTimetable] = await Cs_Shceduler.execute(SqlTimeGroupe, [
      Semester,
      Groupe,
    ]);

    if (GroupTimetable.length) return Reponse.status(200).json(GroupTimetable);
    else
      return Reponse.status(400).json({
        message: 'No timing of this group has been booked',
      });
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const GetRoomsByType = async (Demande, Reponse) => {
  try {
    const { bloc, type } = Demande.query;

    const sqlGetRoomsByType = Cs_Shceduler.format(
      `SELECT id_salle,nom_salle FROM salle
                                                   WHERE bloc_salle=? AND type_salle=?;`,
      [bloc, type],
    );

    const [RoomsFetched] = await Cs_Shceduler.execute(sqlGetRoomsByType);

    if (RoomsFetched.length) return Reponse.status(200).json(RoomsFetched);
    else return Reponse.status(400).json({ message: 'not room exist' });
  } catch (error) {
    Reponse.status(500).json({ message: `${error}` });
  }
};

const RoomScheduler = async (Demande, Reponse) => {
  try {
    const { Semester, RoomId } = Demande.query;

    const SqlTimeRoom = `SELECT se.id_seance, se.jour_id, se.horaire_id, n.nom_niveau, g.nom_groupe, m.nom_module, e.nom_complet
                         FROM seance se
                         JOIN module m ON se.module_id=m.id_module
                         JOIN niveau n ON se.niveau_id=n.id_niveau
                         JOIN enseignant e ON se.enseignant_id=e.id_enseignant
                         LEFT JOIN groupe g ON se.groupe_id=g.id_groupe
                         WHERE semester_seance=? && se.salle_id=?
                         ORDER BY se.jour_id ASC, se.horaire_id ASC;`;

    const [RoomTimetable] = await Cs_Shceduler.execute(SqlTimeRoom, [Semester, RoomId]);

    if (RoomTimetable.length) return Reponse.status(200).json(RoomTimetable);
    else return Reponse.status(400).json({ message: 'No timing of this room has been booked' });
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const GetTeacherStatistics = async (Demande, Reponse) => {
  try {
    const { teacherId, Semester } = Demande.params;

    const teacherStatistics = new Object();

    const [[teacherBasicInfo]] = await Cs_Shceduler.execute(
      `SELECT nom_complet,departement FROM enseignant WHERE id_enseignant=?;`,
      [teacherId],
    );

    const [teachingModules] = await Cs_Shceduler.execute(
      `SELECT DISTINCT m.nom_module FROM module_enseignant me JOIN module m ON me.module_id=m.id_module
         WHERE me.enseignant_id=?;`,
      [teacherId],
    );

    const [groupCount] = await Cs_Shceduler.execute(
      `SELECT DISTINCT groupe_id AS groupId FROM seance
        WHERE enseignant_id=? AND semester_seance=? AND groupe_id IS NOT null;`,
      [teacherId, Semester],
    );

    const [moduleCount] = await Cs_Shceduler.execute(
      `SELECT DISTINCT me.module_id AS moduleId FROM module_enseignant me JOIN module m ON me.module_id=m.id_module
         WHERE me.enseignant_id=? AND m.semester_module=?;`,
      [teacherId, Semester],
    );

    const [[{ Hours }]] = await Cs_Shceduler.execute(
      `SELECT COUNT(*) AS Hours FROM seance WHERE enseignant_id=? AND semester_seance=?;`,
      [teacherId, Semester],
    );

    teacherStatistics['Basic_Info'] = teacherBasicInfo ? teacherBasicInfo : 0;
    teacherStatistics['Modules'] = teachingModules.length
      ? teachingModules
      : `no Modules`;
    teacherStatistics['module_Count'] = moduleCount.length;
    teacherStatistics['group_Count'] = groupCount.length;
    teacherStatistics['teaching_Hours'] = Hours;

    return Reponse.status(200).json(teacherStatistics);
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const GetTeacherScheduler = async (Demande, Reponse) => {
  try {
    const { Semester, teacherId } = Demande.params;

    const SqlTimeTeacher = `SELECT 
                            se.id_seance, se.jour_id, se.horaire_id, se.type_seance, n.nom_niveau, g.nom_groupe, m.nom_module, s.nom_salle
                            FROM seance se
                            JOIN module m ON se.module_id=m.id_module
                            JOIN niveau n ON se.niveau_id=n.id_niveau
                            LEFT JOIN salle s ON se.salle_id=s.id_salle
                            LEFT JOIN groupe g ON se.groupe_id=g.id_groupe
                            WHERE semester_seance=? && se.enseignant_id=?
                            ORDER BY se.jour_id ASC, se.horaire_id ASC;`;

    const [teacherTimetable] = await Cs_Shceduler.execute(SqlTimeTeacher, [
      Semester,
      teacherId,
    ]);

    if (teacherTimetable.length) return Reponse.status(200).json(teacherTimetable);
    else return Reponse.status(400).json({ message: 'No timing of this teacher has been booked' });
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const DeleteSlot = async (Demande, Reponse) => {
  try {
    const { idSlot } = Demande.params;

    const SqlDeleteSlot = Cs_Shceduler.format(`DELETE FROM  seance WHERE id_seance=?;`, [
      idSlot,
    ]);

    const [slotDeleted] = await Cs_Shceduler.execute(SqlDeleteSlot);

    if (slotDeleted.affectedRows === 1)
      return Reponse.status(200).json({ isSuccess: true });
    else return Reponse.status(400).json({ isSuccess: false });
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

export {
  GroupeScheduler,
  RoomScheduler,
  GetRoomsByType,
  GetTeacherStatistics,
  GetTeacherScheduler,
  DeleteSlot,
};
