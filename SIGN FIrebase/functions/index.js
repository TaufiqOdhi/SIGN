//The Cloud functions for Firebase SDK to create Cloud functions and setup triggers.
const functions = require('firebase-functions');

//The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
admin.initializeApp();

//Take the text parameter to this HTTP endpoint and insert it into the
//Realtime database under the path /message/:pushId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
  //Grab the text parameter.
  const original = req.query.teks;
  //Push the new message into the Realtime Database using the Firebase Admin SDK.
  const snapshot = await admin.database().ref('/message').push({original: original});
  //redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
  res.redirect(303, snapshot.ref.toString());
});

//Listen for new messages added to /message/:pushId/original and creates an
//uppercase version of the message to /message/:pushId/uppercase
exports.makeUppercase = functions.database.ref('/message/{pushId}/original')
    .onCreate((snapshot, context) => {
      //Grab the current value of what was written to the Realtime Database.
      const original = snapshot.val();
      console.log('Uppercasing', context.params.pushId, original);
      const uppercase = original.toUpperCase();
      //You must return a Promise when performing asynchronous tasks inside a functions such as
      //writing to the Firebase Realtime Database.
      //Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      return snapshot.ref.parent.child('uppercase').set(uppercase);
    });

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
