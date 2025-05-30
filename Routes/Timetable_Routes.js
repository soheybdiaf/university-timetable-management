import {
  GroupeScheduler,
  RoomScheduler,
  GetTeacherStatistics,
  GetTeacherScheduler,
  GetRoomsByType,
  DeleteSlot,
} from '../controllers/Timetable_Cotrollers.js';
import { AuthorizeRoles } from '../config/Middlewares/Auth_Middle.js';
import { Router } from 'express';
const router = Router();

router
  .get(
    '/get_teacher_scheduler/:teacherId/:Semester',
    AuthorizeRoles('admin', 'Teacher'),
    GetTeacherScheduler,
  )
  .get('/get_groupe_scheduler', AuthorizeRoles('admin', 'Student'), GroupeScheduler)
  .get(
    '/get_teacher_statistics/:teacherId/:Semester',
    AuthorizeRoles('admin'),
    GetTeacherStatistics,
  )
  .delete('/delete_slot/:idSlot', AuthorizeRoles('admin'), DeleteSlot)
  .get('/get_room_scheduler', AuthorizeRoles('admin'), RoomScheduler)
  .get('/get_rooms_by_type', AuthorizeRoles('admin'), GetRoomsByType);

export default router;
