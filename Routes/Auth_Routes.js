import { SignIn, SignOut } from '../controllers/Auth_Controllers.js';
import { Router } from 'express';
const router = Router();

router.post('/SignIn', SignIn).get('/signout', SignOut);

export default router;
