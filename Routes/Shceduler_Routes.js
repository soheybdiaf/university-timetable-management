import {
  GET_SUBJECT_SHCEDULER,
  CHECK_AVAILABLE_SHCEDULER,
  CHECK_AVAILABLE_ROOMS,
  POST_NEW_SHCEDULER,
  TIMES_AVAILABLE,
  TEACHER_SUBJECT_INFO,
} from '../controllers/Shceduler_Controllers.js';
import { Router } from 'express';
const router = Router();

router
  .get('/get_subject_shceduler', GET_SUBJECT_SHCEDULER)
  .get('/check_shceduler', CHECK_AVAILABLE_SHCEDULER)
  .get('/get_available_time', TIMES_AVAILABLE)
  .get('/check_available_rooms', CHECK_AVAILABLE_ROOMS)
  .get('/teacher_subject_info/:teacherId/:subjectId', TEACHER_SUBJECT_INFO)
  .post('/submit_shceduler', POST_NEW_SHCEDULER);
export default router;
