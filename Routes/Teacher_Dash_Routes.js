import {
  GetTeacherInfo,
  GetTeacherStatistics,
  PostTeacherPreferencesTimes,
  GetTeacherPreferencesModules,
  PostTeacherPreferencesModules,
  UpdateTeacherProfile,
  searchModulesByCharacters,
} from '../controllers/Teacher_Dash_controllers.js';
import { Router } from 'express';
const router = Router();

router
  .get('/Get_teacher_Info/:Username', GetTeacherInfo)
  .get('/Get_teacher_Statistics/:teacherId', GetTeacherStatistics)
  .get('/search_modules', searchModulesByCharacters)
  .get('/get_Preferences_Module/:teacherId', GetTeacherPreferencesModules)
  .post('/Post_Preferences_Times', PostTeacherPreferencesTimes)
  .post('/Post_Preferences_Module', PostTeacherPreferencesModules)
  .post('/profile_update', UpdateTeacherProfile);

export default router;
