import Cs_Shceduler from '../config/Mysql_DB.js';
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import md5 from 'md5';
config();

const SignIn = async (Demande, Reponse) => {
  try {
    const { email, password, role } = Demande.body;

    const UserTable =
      role == 'admin' ? 'administrateur' : role == 'Teacher' ? 'enseignant' : 'etudiant';

    const [[UserInfo]] = await Cs_Shceduler.execute(
      `SELECT * FROM ${UserTable} WHERE email=?`,
      [email],
    );

    const hashedPassword = md5(password);

    if (!UserInfo || hashedPassword !== UserInfo.mot_passe)
      return Reponse.status(401).json({ text: 'Invalid credentials' });

    const token = jwt.sign(
      { username: UserInfo.username, Role: role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '3h' },
    );

    Reponse.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 3 * 60 * 60 * 1000,
    });

    return Reponse.status(200).json({
      success: true,
      text: 'Login successful',
      redirect: `/Dashboard.html`,
    });
  } catch (error) {
    Reponse.status(500).json(`Login failed: ${error}`);
  }
};

const SignOut = async (Demande, Reponse) => {
  Reponse.clearCookie('token', { httpOnly: true, sameSite: 'strict' });
  Reponse.status(200).json({ success: true, redirect: `/Access_Portal.html` });
};

export { SignIn, SignOut };
