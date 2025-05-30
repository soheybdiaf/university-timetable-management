import {
  Teacher_Register,
  Student_Register,
  getGroupes,
  getLevels,
} from '../controllers/Inscription_Controllers.js';
import { Router } from 'express';

const router = Router();

router
  .post('/teacher', Teacher_Register)
  .post('/student', Student_Register)
  .get('/get-niveau', getLevels)
  .get('/get-groupes/:niveau_id', getGroupes);

export default router;
