import {
  GET_ROOMS,
  GET_ROOMS_BY_ID,
  POST_ROOM,
  DELETE_ROOM,
  PATCH_ROOM,
} from '../controllers/Room_Controllers.js';
import { Router } from 'express';
const router = Router();

router
  .get('/get-rooms', GET_ROOMS)
  .get('/get-rooms/:ID_CLASSROOM', GET_ROOMS_BY_ID)
  .post('/new_classroom', POST_ROOM)
  .delete('/delete_classroom/:ID_CLASSROOM', DELETE_ROOM)
  .patch('/patch_classroom/:ID_CLASSROOM', PATCH_ROOM);

export default router;
