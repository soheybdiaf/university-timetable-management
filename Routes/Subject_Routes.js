import {
  GET_SUBJECTS,
  GET_SUBJECT_BY_ID,
  POST_SUBJECT,
  DELETE_SUBJECT,
  PATCH_SUBJECT,
} from '../controllers/Subject_Controllers.js';
import { Router } from 'express';
const router = Router();

router
  .get('/get-subject', GET_SUBJECTS)
  .get('/get-subject/:ID_SUBJECT', GET_SUBJECT_BY_ID)
  .post('/new_subject', POST_SUBJECT)
  .delete('/delete_subject/:ID_SUBJECT', DELETE_SUBJECT)
  .patch('/patch_subject/:ID_SUBJECT', PATCH_SUBJECT);

export default router;
