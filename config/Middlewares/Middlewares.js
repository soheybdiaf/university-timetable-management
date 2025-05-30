import express from 'express';

export const Json_Mid = express.json(); // Analyser les données JSON envoyées lors de la requête et les convertir en objet JavaScript
export const public_fs = express.static('public'); // Soumettre des fichiers statiques partagés via http
