//The Cloud functions for Firebase SDK to create Cloud functions and setup triggers.
const functions = require('firebase-functions');

//The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
admin.initializeApp();

//untuk menambah User
exports.addUser = functions.https.onRequest(async (req, res) =>{
  const username = req.query.username;
  const nama = req.query.nama;
  const snapshot = await admin.database().ref('playerDB').child(username).set({nama: nama});
  res.end();
});

//untuk menambah nilai skor pada User tertentu
exports.addScore = functions.https.onRequest(async (req, res) =>{
  const username = req.query.username;
  const timescore = req.query.timescore;
  const finishscore = req.query.finishscore;
  const snapshot = await admin.database().ref('playerDB').child(username).child('scores').push({
    timescore: timescore,
    finishscore: finishscore
  });
  res.end();
});


//Generate Sertifikat (menggunakan express)
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World !');
});

// Expose Express API as a single Cloud Function:
exports.widgets = functions.https.onRequest(app);
