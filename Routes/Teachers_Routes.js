import {
  GET_TEACHERS,
  GET_TEACHER_BY_ID,
  GET_TEACHER_INFO_BY_ID,
  POST_TEACHER,
  DELETE_TEACHER,
  PATCH_TEACHER,
} from '../controllers/Teachers_Controllers.js';
import { Router } from 'express';
const router = Router();

router
  .get('/get-teachers', GET_TEACHERS)
  .get('/get-teachers/:ID_TEACHER', GET_TEACHER_BY_ID)
  .get('/get-teachers-info/:ID_TEACHER', GET_TEACHER_INFO_BY_ID)
  .post('/new_teacher', POST_TEACHER)
  .delete('/delete_teacher/:ID_TEACHER', DELETE_TEACHER)
  .patch('/patch_teacher/:ID_TEACHER', PATCH_TEACHER);

export default router;
