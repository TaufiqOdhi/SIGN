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
  const snapshot = await admin.database().ref('playerScores').child(username).push({
    timescore: timescore,
    finishscore: finishscore
  });
  res.end();
});

//-------------------------------------------------------------------------------\
//untuk fungsi server
var express = require('express');
const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const pretty = require('express-prettify');

var app = express();
var username;
var nama;
var timescore;
var finishscore;

//Untuk retrieve data dari database berdasarkan username yang diinputkan
app.use(express.static('public'));
app.use(pretty({ query: 'pretty'}));
app.get('/', function(req, res){
  username = req.query.username;
  res.redirect('/server/readDatabase');
});

//generate sertif (Untuk debug)
app.get('/sertif', function(req, res){
  res.sendFile( __dirname + "/html/" + "index.html" );
});

//read firebase realtime database
app.get('/readDatabase', async (req, res) => {
  try{
    var snapshotNama = await admin.database().ref('playerDB').child(username)
                              .child('nama').once('value');
    var snapshotScore = await admin.database().ref('playerScores').child(username)
                              .limitToLast(1).once('value');
    nama = snapshotNama.val().toUpperCase();
    snapshotScore.forEach(function(child){
      timescore = child.val().timescore;
      finishscore = child.val().finishscore;
    });
  } catch(error) {
    console.error(error);
    return res.status(500).send(error);
  }
  return res.redirect('/server/generate');
});

//export sertif ke PDF
app.get('/generate', async (req, res)=>{
  try{
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.goto("http://localhost:8080/sertif?nama="+nama+
                  "&timescore="+timescore+"&finishscore="+finishscore);
    await page.emulateMedia('screen');
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      landscape: true
    });
    console.log('done');
    res.set("Content-Type", "application/pdf");
    await browser.close();
    res.status(200).send(pdfBuffer);
  } catch(error){
    console.error(error);
    return res.status(500).send(error);
  }
});

app.get('/getScores', async (req, res)=>{
  try{
    var snapshot = await admin.database().ref('playerScores').
          child(req.query.username).once('value');
    var arrJson = [];
    var i = 1;

    //menjadikan array json
    await snapshot.forEach(function(child){
        var item = child.val();
        item.no = i;
        i++;
        arrJson.push(item);
    });
  } catch(error){
    console.error(error);
    return res.status(500).send(error);
  }
  res.header("Access-Control-Allow-Origin", "*");
  return res.json(arrJson);
});

app.get('/getData', async (req, res)=>{
  try{
    var snapshot = await admin.database().ref('playerDB').once('value');
    var arrJson = [];

    //menjadikan array JSON
    await snapshot.forEach(function(child){
        // var finishscoreSnap;
        // var timescoreSnap;
        var item = child.val();
        item.username = child.key;
        var scoreRef = admin.database().ref('playerScores');
        scoreRef.child(child.key).limitToLast(1).on('value', function(snap){
              snap.forEach(function(cSnap){
                  item.timescore  = cSnap.val().timescore;
                  item.finishscore = cSnap.val().finishscore;
              });
          }, function (errorObject) {
              console.log("The read failed: " + errorObject.code);
          });
        arrJson.push(item);
    });
  } catch(error){
    console.error(error);
    return res.status(500).send(error);
  }
  res.header("Access-Control-Allow-Origin", "*");
  if(arrJson[0].timescore == undefined){
    return res.redirect('/server/getData?pretty');
  }
  return res.json(arrJson);
});

var server = app.listen(process.env.PORT || 8081, function() {
  var port = server.address().port
  console.log("Your app listening at http://localhost:",port)
});

exports.server = functions.https.onRequest(app);
