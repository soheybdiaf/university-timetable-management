import Cs_Shceduler from '../config/Mysql_DB.js';

const GET_SUBJECT_SHCEDULER = async (Demande, Reponse) => {
  try {
    const { semester_seance, type_seance, niveau_id, groupe_id } = JSON.parse(
      Demande.query.obj,
    );

    const countType =
      type_seance == 'courses'
        ? 'nombre_cours'
        : type_seance == 'supervised_work'
          ? 'nombre_td'
          : 'nombre_tp';

    const SQL_GET = `SELECT em.enseignant_id, en.nom_complet, em.module_id, m.nom_module, (m.${countType} - ( SELECT COUNT(*)
                      FROM seance se
                      WHERE se.module_id = em.module_id
                      AND se.type_seance=em.type_module
                      AND groupe_id ${groupe_id ? `= ${groupe_id}` : 'IS NULL'}) ) AS se_restantes
                      FROM module_enseignant em
                      JOIN enseignant en ON em.enseignant_id = en.id_enseignant
                      JOIN module m ON em.module_id = m.id_module
                      WHERE em.type_module = ? AND m.niveau_module = ? AND m.semester_module = ?;`;

    const [SUBJECT_SHCEDULER] = await Cs_Shceduler.execute(SQL_GET, [
      type_seance,
      niveau_id,
      semester_seance,
    ]);

    const SUBJECT_SHCEDULER_DISTINCT = SUBJECT_SHCEDULER.reduce((acc, value) => {
      const existing = acc.find((item) => item.nom_module === value.nom_module);
      existing
        ? ((existing.enseignant_id = [existing.enseignant_id, value.enseignant_id].flat(
            1,
          )),
          (existing.nom_complet = [existing.nom_complet, value.nom_complet].flat(1)))
        : acc.push(value);
      return acc;
    }, []);

    if (SUBJECT_SHCEDULER_DISTINCT.length > 0)
      return Reponse.status(200).json(SUBJECT_SHCEDULER_DISTINCT);
    else
      return Reponse.status(400).json({
        message: 'SUBJECT SHCEDULER not exists',
      });
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const CHECK_AVAILABLE_SHCEDULER = async (Demande, Reponse) => {
  try {
    const { semester, enseignant_id, horaire_id, jour_id, niveau_id, groupe_id } =
      JSON.parse(Demande.query.obj);

    const SQL_IS_TEACHER_BOOKED = `SELECT 1 FROM seance WHERE semester_seance=? AND enseignant_id=? AND jour_id=? AND horaire_id=?`;

    const SQL_IS_LEVEL_BOOKED = `SELECT 2 FROM seance WHERE semester_seance=? AND niveau_id=? AND jour_id=? AND horaire_id=?`;

    const SQL_IS_GROUPE_BOOKED = `SELECT 3 FROM seance WHERE semester_seance=? AND (groupe_id=? OR (niveau_id=? AND groupe_id IS NULL)) AND jour_id=? AND horaire_id=?;`;

    const [IS_TEACHER_BOOKED] = await Cs_Shceduler.execute(SQL_IS_TEACHER_BOOKED, [
      semester,
      enseignant_id,
      jour_id,
      horaire_id,
    ]);

    const [IS_LEVEL_BOOKED] = await Cs_Shceduler.execute(SQL_IS_LEVEL_BOOKED, [
      semester,
      niveau_id,
      jour_id,
      horaire_id,
    ]);

    const [IS_GROUPE_BOOKED] = await Cs_Shceduler.execute(SQL_IS_GROUPE_BOOKED, [
      semester,
      groupe_id,
      niveau_id,
      jour_id,
      horaire_id,
    ]);

    if (  ( !IS_TEACHER_BOOKED.length && !IS_LEVEL_BOOKED.length ) || ( !IS_TEACHER_BOOKED && !IS_GROUPE_BOOKED )  ){
      return Reponse.status(200).json({
        isSuccess: true,
        message: `Available`,
      });
    } else
      return Reponse.status(400).json({
        isSuccess: false,
        message: `Not Available`,
      });
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const CHECK_AVAILABLE_ROOMS = async (Demande, Reponse) => {
  try {
    const { semester, day, time, type } = JSON.parse(Demande.query.obj);

    const RoomType =
      type === 'courses' ? 'amphi' : type === 'supervised_work' ? 'salle_td' : 'salle_tp';

    const SQL_GET_ROOMS = `SELECT sa.id_salle,sa.nom_salle FROM salle sa
                         LEFT JOIN seance se
                         ON sa.id_salle=se.salle_id AND semester_seance=? AND se.jour_id=? AND se.horaire_id=?
                         WHERE se.salle_id IS null AND sa.type_salle=?;`;

    const [ROOMS_AVAILABLE] = await Cs_Shceduler.execute(SQL_GET_ROOMS, [
      semester,
      day,
      time,
      RoomType,
    ]);

    if (ROOMS_AVAILABLE.length > 0)
      return Reponse.status(200).json({
        isSuccess: true,
        message: `Available`,
        data: ROOMS_AVAILABLE,
      });
    else
      return Reponse.status(400).json({
        isSuccess: false,
        message: `Not Available`,
      });
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const POST_NEW_SHCEDULER = async (Demande, responce) => {
  try {
    const arrShceduler = Demande.body;

    const columns = `(semester_seance, type_seance, niveau_id, groupe_id, enseignant_id, module_id, salle_id, jour_id, horaire_id, mode)`;

    const INSERT_SHCEDULER = Cs_Shceduler.format(
      `INSERT INTO seance ${columns} VALUES ?`,
      [arrShceduler],
    );

    const [SUBMIT_RESELT] = await Cs_Shceduler.execute(INSERT_SHCEDULER);

    if (SUBMIT_RESELT.affectedRows === arrShceduler.length)
      return responce.status(200).json({
        isSuccess: true,
        message: `You Added ${arrShceduler.length} shceduler with successfully`,
      });
    else
      return responce.status(400).json({
        isSuccess: false,
        message: `Your Booking Not successfully Or Not Fully Reserved`,
      });
  } catch (Erreur) {
    responce.status(500).json({ message: `${Erreur}` });
  }
};

const TIMES_AVAILABLE = async (Demande, reponce) => {
  try {
    const { semestre, niveau_id, groupe_id, enseignant_id } = Demande.query;

    const sem_seance = `semester_seance='${semestre}'`;

    const timesNullOf_Groupe_Level =
      groupe_id == 'null'
        ? `se.niveau_id=?`
        : `( (se.groupe_id=${groupe_id}) OR (se.niveau_id=? AND se.groupe_id IS NULL) )`;

    const sqlGetTimesAvailable = Cs_Shceduler.format(
      `SELECT j.id_jours AS jour, h.id_horaires AS horaire
     FROM jours j CROSS JOIN horaires h
     LEFT JOIN seance se ON se.${sem_seance} AND j.id_jours = se.jour_id AND h.id_horaires = se.horaire_id  AND ${timesNullOf_Groupe_Level}
     LEFT JOIN seance se1 ON se1.${sem_seance} AND j.id_jours = se1.jour_id AND h.id_horaires = se1.horaire_id AND se1.enseignant_id=?
     WHERE se.groupe_id IS NULL AND se.niveau_id IS NULL AND se1.enseignant_id IS NULL;`,
      [niveau_id, enseignant_id],
    );

    const [result] = await Cs_Shceduler.execute(sqlGetTimesAvailable);

    if (result.length) {
      const times = [
        '08:00-9:30',
        '09:45-11:15',
        '11:30-13:00',
        '14:00-15:30',
        '15:45-17:15',
      ];

      const timesAvailable = [...Array(5)]
        .map(
          (_, i) =>
            `<tr>
        <td>${times[i]}</td>
        ${[...Array(6)]
          .map((_, j) => {
            const isMatched = result.some(
              ({ jour, horaire }) => jour === j + 1 && horaire === i + 1,
            );
            return `<td id="${j + 1}-${i + 1}">${
              isMatched
                ? `<button class="isRooms"data-day=${j + 1} data-time=${i + 1}>✅</button>`
                : '❌'
            }</td>`;
          })
          .join('')}
      </tr>`,
        )
        .join('');

      return reponce.status(200).send(timesAvailable);
    } else
      return reponce
        .status(400)
        .json({ isSuccess: false, message: 'Not time available' });
  } catch (Erreur) {
    return reponce.status(500).json({ message: `${Erreur}` });
  }
};

const TEACHER_SUBJECT_INFO = async (Demande, Reponce) => {
  try {
    const { teacherId, subjectId } = Demande.params;

    const sqlGetinfo = Cs_Shceduler.format(
      `SELECT DISTINCT
                        me.enseignant_id,
                        e.nom_complet,
                        e.module_preferes,
                        e.jours_preferes,
                        e.horaires_preferes,
                        e.departement,
                        ( SELECT COUNT(*) FROM seance se
                          WHERE se.enseignant_id = me.enseignant_id AND se.semester_seance=m.semester_module ) AS schedulerReserved,
                        m.id_module,
                        m.nom_module,
                        m.semester_module,
                        s.nom_specialite,
                        (m.nombre_td + m.nombre_tp + m.nombre_cours) AS weeklyhorairesNumber
                        FROM module_enseignant me
                        JOIN enseignant e ON e.id_enseignant = me.enseignant_id
                        JOIN module m ON m.id_module = me.module_id
                        JOIN specialite s ON m.semester_module = s.id_specialite
                        WHERE me.enseignant_id=? AND me.module_id=?;`,
      [teacherId, subjectId],
    );

    const [[techerSubjectInfo]] = await Cs_Shceduler.execute(sqlGetinfo);

    if (techerSubjectInfo) Reponce.status(200).json(techerSubjectInfo);
    else
      return Reponce.status(400).json({
        isSuccess: false,
        message: 'Not info available',
      });
  } catch (Erreur) {
    Reponce.status(500).json({ message: `${Erreur}` });
  }
};

export {
  GET_SUBJECT_SHCEDULER,
  CHECK_AVAILABLE_SHCEDULER,
  CHECK_AVAILABLE_ROOMS,
  POST_NEW_SHCEDULER,
  TIMES_AVAILABLE,
  TEACHER_SUBJECT_INFO,
};
