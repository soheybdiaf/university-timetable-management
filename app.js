import {
  VerifyToken,
  AccessStaticFilesByRole,
  AuthorizeRoles,
} from './config/Middlewares/Auth_Middle.js';
import { public_fs, Json_Mid } from './config/Middlewares/Middlewares.js';
import Teachers_Subject_Router from './Routes/Teachers_Subjects_Routes.js';
import ProfileInfo from './config/Middlewares/Profile_Middle.js';
import Inscription_Router from './Routes/Inscription_Routes.js';
import Teacher_Dashboard from './Routes/Teacher_Dash_Routes.js';
import Student_Dashboard from './Routes/Student_Dash_Routes.js';
import Shceduler_Router from './Routes/Shceduler_Routes.js';
import Timetable_Router from './Routes/Timetable_Routes.js';
import Dashboard_Router from './Routes/Dashboard_Routes.js';
import Teachers_Router from './Routes/Teachers_Routes.js';
import Students_Router from './Routes/Students_Routes.js';
import Classroms_Router from './Routes/Rooms_Routes.js';
import Subject_Router from './Routes/Subject_Routes.js';
import Auth_Router from './Routes/Auth_Routes.js';
import express from 'express';
const app = express();
// Middlewares
app.use(Json_Mid);
app.use(public_fs);
// Public Routes
app.use('/Auth', Auth_Router);
app.use('/inscription', Inscription_Router);
// auth Operation
app.use(VerifyToken, AccessStaticFilesByRole);
app.get('/profile', ProfileInfo);
// Admin Routes
app.use('/Timetable', AuthorizeRoles('admin', 'Teacher', 'Student'), Timetable_Router);
app.use('/Dashboard', AuthorizeRoles('admin'), Dashboard_Router);
app.use('/Teachers', AuthorizeRoles('admin'), Teachers_Router);
app.use('/Subjects', AuthorizeRoles('admin'), Subject_Router);
app.use('/Teachers_Subjects', AuthorizeRoles('admin'), Teachers_Subject_Router);
app.use('/Shceduler', AuthorizeRoles('admin'), Shceduler_Router);
app.use('/students', AuthorizeRoles('admin'), Students_Router);
app.use('/rooms', AuthorizeRoles('admin'), Classroms_Router);
// Teacher Routes
app.use('/Teacher-Dashboard', AuthorizeRoles('Teacher'), Teacher_Dashboard);
// Student Routes
app.use('/Student-Dashboard', Student_Dashboard);

export default app;
