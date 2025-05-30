import {
  GetStudentInfo,
  GetStudySummary,
  GetCoursesStatistiques,
} from '../controllers/Students_Dash_controllers.js';
import { Router } from 'express';
const router = Router();

router
  .get('/Get_student_Info/:Username', GetStudentInfo)
  .get('/get_study_summary/:LevelId/:GroupeId', GetStudySummary)
  .get('/get_Courses_statistiques/:LevelId/:SpecialityId', GetCoursesStatistiques);

export default router;
