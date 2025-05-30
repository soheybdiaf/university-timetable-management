import express from 'express';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

function VerifyToken(Demande, Reponse, Suivant) {
  const Token = Demande.headers.cookie?.split('=')[1];
  jwt.verify(Token, process.env.JWT_SECRET_KEY, (erreur, decode) => {
    if (!Token || erreur)
      return Reponse.status(403).send(
        'No tokens provided Or Token authentication failed',
      );
    Demande.username = decode.username;
    Demande.role = decode.Role;
    Suivant();
  });
}

function AccessStaticFilesByRole(Demande, Reponse, Suivant) {
  const role = Demande.role;
  if (role === 'admin') return express.static('Admin')(Demande, Reponse, Suivant);
  else if (role === 'Teacher')
    return express.static('Teachers')(Demande, Reponse, Suivant);
  else if (role === 'Student')
    return express.static('Students')(Demande, Reponse, Suivant);
  else return Reponse.status(403).json({ message: 'Unauthorized role' });
}

function AuthorizeRoles(...Roles) {
  return (Demande, Reponse, Suivant) => {
    const userRole = Demande?.role;
    if (!userRole || !Roles.includes(userRole))
      return Reponse.status(403).json({
        message: 'You do not have access to this resource',
      });
    Suivant();
  };
}

export { VerifyToken, AccessStaticFilesByRole, AuthorizeRoles };
