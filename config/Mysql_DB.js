import mysql from 'mysql2/promise';
import { config } from 'dotenv';
config();

const Cs_Shceduler = mysql.createPool({
  // Envoi de plusieurs demandes de plusieurs utilisateurs en même temps
  host: process.env.DB_HOSTNAME,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

Cs_Shceduler.getConnection()
  .then(() => console.log("Base de données 'Cs_Shceduler' connectée avec succès !"))
  .catch((ERREUR) =>
    console.error("Erreur de connexion à la base de données: 'Cs_Shceduler'", ERREUR),
  );

export default Cs_Shceduler;
