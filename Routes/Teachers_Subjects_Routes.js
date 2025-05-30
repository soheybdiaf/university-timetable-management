import {
  GET_SUBJECT_BY_LEVEL,
  GET_TEACHERS_BY_SUBJECTS,
  GET_TYPES_SUBJECT,
  POST_SUBJECTS_TEACHERS,
  DELETE_SUBJECTS_TEACHERS,
} from '../controllers/Teachers_Subjects_Controllers.js';
import { Router } from 'express';
const router = Router();

router
  .post('/add_subjects_teachers', POST_SUBJECTS_TEACHERS)
  .get('/get_subject_by_level', GET_SUBJECT_BY_LEVEL)
  .get('/get_teachers_by_subjects', GET_TEACHERS_BY_SUBJECTS)
  .get('/get_types_subject', GET_TYPES_SUBJECT)
  .delete('/delete_teachers_subject', DELETE_SUBJECTS_TEACHERS);

export default router;
