//The Cloud functions for Firebase SDK to create Cloud functions and setup triggers.
const functions = require('firebase-functions');

//The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
admin.initializeApp();

//untuk menambah User
exports.addUser = functions.https.onRequest(async (req, res) =>{
  const username = req.query.username;
  const nama = req.query.nama;
  const asalSekolah = req.query.asalSekolah;
  const snapshot = await admin.database().ref('playerDB').child(username).set({
      username: username,
      nama: nama,
      asalSekolah: asalSekolah
  });
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

//untuk fetch semua data user
exports.getData = functions.https.onRequest(async (req, res)=>{
  const snapshot = await admin.database().ref('playerDB').once('value');
  res.json([snapshot.val()]);
});
