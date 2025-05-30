import SERVER from './app.js';
import { config } from 'dotenv';
config();

const Link = `${process.env.BASE_URL}/Access_Portal.html`;

SERVER.listen(4259, 'localhost', () => {
  console.log(
    `Le serveur écoute le port '4259' Cliquez sur le lien suivant: ${Link} pour vous connecter à l'application 'Cs_Shceduler'`,
  );
});
