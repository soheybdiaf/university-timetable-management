import Cs_Shceduler from '../config/Mysql_DB.js';

const GET_ROOMS = async (Demande, Reponse) => {
  try {
    const SQL_GET_ROOMS = 'SELECT * FROM salle;';

    const [ARRAY_ROOMS] = await Cs_Shceduler.execute(SQL_GET_ROOMS);

    if (!ARRAY_ROOMS) return Reponse.status(400).json({ message: 'no room exist' });
    else return Reponse.status(200).json(ARRAY_ROOMS);
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const GET_ROOMS_BY_ID = async (Demande, Reponse) => {
  try {
    const { ID_CLASSROOM } = Demande.params;

    const SQL_GET = 'SELECT * FROM salle WHERE id_salle= ?;';

    const [ROOM] = await Cs_Shceduler.execute(SQL_GET, [ID_CLASSROOM]);

    if (ROOM.length === 1) return Reponse.status(200).json(ROOM);
    else return Reponse.status(400).json({ message: 'room is not exists' });
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const POST_ROOM = async (Demande, Reponse) => {
  try {
    const { nom_salle, bloc_salle, type_salle } = Demande.body;

    const classroom_names = nom_salle.trim().split(',');

    const names_array = classroom_names.filter((item) => item !== '');

    const classroom_rows = names_array.map((name) => [name, bloc_salle, type_salle]);

    const SQL_CHECK = Cs_Shceduler.format(`SELECT * FROM salle WHERE nom_salle IN (?);`, [
      names_array,
    ]);

    const [ARRAY_CLASSROOM] = await Cs_Shceduler.execute(SQL_CHECK);

    const DeplicatedNames = ARRAY_CLASSROOM.map((room) => room.nom_salle);

    if (ARRAY_CLASSROOM.length > 0)
      return Reponse.status(400).json({
        message: `room name ${DeplicatedNames} already exist`,
      });

    const SQL_CREATE = Cs_Shceduler.format(
      `INSERT INTO salle (nom_salle, bloc_salle, type_salle) VALUES ?;`,
      [classroom_rows],
    );

    const [NEW_CLASS] = await Cs_Shceduler.execute(SQL_CREATE);

    if (!NEW_CLASS || NEW_CLASS.affectedRows !== classroom_rows.length)
      return Reponse.status(400).json({
        message: 'Something went wrong, or not fully reserved',
      });
    else
      return Reponse.status(200).json({
        message: `CLASSROOMS (${names_array}) has been Added successfully`,
      });
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const DELETE_ROOM = async (Demande, Reponse) => {
  try {
    const { ID_CLASSROOM } = Demande.params;

    const SQL_DELETE = 'DELETE FROM salle WHERE id_salle=?;';

    const [CLASSROOM_DELETED] = await Cs_Shceduler.execute(SQL_DELETE, [ID_CLASSROOM]);

    if (!CLASSROOM_DELETED || CLASSROOM_DELETED.affectedRows === 0)
      return Reponse.status(400).json({
        message: 'classroom not successfully removed',
      });
    else
      return Reponse.status(200).json({
        message: `The CLASSROOM has been successfully removed from the database`,
      });
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

const PATCH_ROOM = async (Demande, Reponse) => {
  try {
    const { ID_CLASSROOM } = Demande.params;

    const { nom_salle, bloc_salle, type_salle } = Demande.body;

    const SQL_PATCH =
      'UPDATE salle SET nom_salle=?, bloc_salle=?, type_salle=? WHERE id_salle=?;';

    const [CLASSROOM_PATCHED] = await Cs_Shceduler.execute(SQL_PATCH, [
      nom_salle,
      bloc_salle,
      type_salle,
      ID_CLASSROOM,
    ]);

    if (!CLASSROOM_PATCHED || CLASSROOM_PATCHED.affectedRows === 0)
      return Reponse.status(400).json({
        message: 'Something went wrong, classroom not patched',
      });
    else
      return Reponse.status(200).json({
        message: `The CLASSROOM has been successfully patched from the database`,
      });
  } catch (Erreur) {
    Reponse.status(500).json({ message: `${Erreur}` });
  }
};

export { GET_ROOMS, GET_ROOMS_BY_ID, POST_ROOM, DELETE_ROOM, PATCH_ROOM };
