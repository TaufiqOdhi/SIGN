var express = require('express');
var firebase = require('firebase/app');
require('firebase/database');
const puppeteer = require('puppeteer');
const fs = require('fs-extra');

var firebaseConfig = {
  projectId: 'sign-e15cc',
  databaseURL: 'https://sign-e15cc.firebaseio.com',
};
firebase.initializeApp(firebaseConfig);
var app = express();
var nama;
var timescore;
var finishscore;

//Untuk retrieve data dari database berdasarkan username yang diinputkan
app.use(express.static('public'));
app.get('/', function(req, res){
  res.redirect('/readDatabase');
});

//generate sertif (Untuk debug)
app.get('/sertif', function(req, res){
  res.sendFile( __dirname + "/html/" + "index.html" );
});

app.get('/showPDF', function(req, res){
  res.sendFile(__dirname+"/sertif/"+nama+".pdf");
});

app.get('/readDatabase', async (req, res) => {
  try{
    //nama = "Hinata Shoyo";
    var ref = firebase.database().ref('playerDB/suzune');
    var snapshot = await ref.once('value');
    nama = snapshot.val().nama.toUpperCase();
    timescore = 500;
    finishscore = 670;
  } catch(error) {
    return res.send(error);
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
      path: 'sertif/'+nama+'.pdf',
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

var server = app.listen(8081, function() {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://localhost", host, port)
});
