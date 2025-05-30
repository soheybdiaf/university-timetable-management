import {
  GET_STATISTIQUES,
  Groupes_Stat,
  Get_Enseignants,
  Enseignant_Stat,
} from '../controllers/Dashboard_Controllers.js';
import { Router } from 'express';
const router = Router();

router
  .get('/get_statistiques', GET_STATISTIQUES)
  .get('/seances_restantes/:levelId/:Semester', Groupes_Stat)
  .get('/get_Enseignants', Get_Enseignants)
  .get('/enseignant-stat/:enseignantId/:semester', Enseignant_Stat);

export default router;
