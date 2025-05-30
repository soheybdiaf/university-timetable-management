import {
  GET_STUDENTS,
  GET_STUDENT_BY_ID,
  POST_STUDENT,
  DELETE_STUDENT,
  PATCH_STUDENT,
} from '../controllers/Students_Controllers.js';
import { Router } from 'express';
const router = Router();

router
  .get('/get-students', GET_STUDENTS)
  .get('/get-students/:ID_STUDENT', GET_STUDENT_BY_ID)
  .post('/new_student', POST_STUDENT)
  .delete('/delete_student/:ID_STUDENT', DELETE_STUDENT)
  .patch('/patch_student/:ID_STUDENT', PATCH_STUDENT);

export default router;
