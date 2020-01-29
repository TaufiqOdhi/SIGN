var express = require('express');
var firebase = require('firebase/app');
require('firebase/database');
const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const pretty = require('express-prettify')

var firebaseConfig = {
  projectId: 'sign-e15cc',
  databaseURL: 'https://sign-e15cc.firebaseio.com',
};
firebase.initializeApp(firebaseConfig);
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
  res.redirect('/readDatabase');
});

//generate sertif (Untuk debug)
app.get('/sertif', function(req, res){
  res.sendFile( __dirname + "/html/" + "index.html" );
});

app.get('/showPDF', function(req, res){
  res.sendFile(__dirname+"/sertif/"+username+".pdf");
});

//read firebase realtime database
app.get('/readDatabase', async (req, res) => {
  try{
    var ref = firebase.database().ref('playerDB').child(username);
    var snapshotNama = await ref.child('nama').once('value');
    var snapshotScore = await ref.child('scores').limitToLast(1).once('value');
    nama = snapshotNama.val().toUpperCase();
    snapshotScore.forEach(function(child){
      timescore = child.val().timescore;
      finishscore = child.val().finishscore;
    });
  } catch(error) {
    console.error(error);
    return res.status(500).send(error);
  }
  return res.redirect('/generate');
});

//export sertif ke PDF
app.get('/generate', async (req, res)=>{
  try{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("http://localhost:8081/sertif?nama="+nama+
                  "&timescore="+timescore+"&finishscore="+finishscore);
    await page.emulateMedia('screen');
    await page.pdf({
      path: 'sertif/'+username+'.pdf',
      format: 'A4',
      printBackground: true,
      landscape: true
    });
    console.log('done');
    await browser.close();
  } catch(error){
    console.eror(error);
    return res.status(500).send(error);
  }
  return res.redirect('/showPDF');
});

app.get('/getData', async (req, res)=>{
  try{
    var ref = firebase.database().ref('playerDB');
    var snapshot = await ref.once('value');
    var arrJson = [];
    await snapshot.forEach(function(child){
        var item = child.val();
        arrJson.push(item);
    });
  } catch(error){
    console.error(error);
    return res.status(500).send(error);
  }
  return res.json(arrJson);
});

var server = app.listen(process.env.PORT || 8081, function() {
  var port = server.address().port
  console.log("Your app listening at http://localhost:",port)
});
