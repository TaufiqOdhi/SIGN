var express = require('express');
const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const admin = require('firebase-admin');
admin.initializeApp();

var app = express();
const nama = "Nakiri Erina";
const timescore = 100;
const finishscore = 100;
//const db = admin.database();
//const ref = db.ref('playerDB/tanjiro');

//Untuk retrieve data dari database berdasarkan username yang diinputkan
app.use(express.static('public'));
app.get('/', function (req, res) {
  res.redirect('/sertif?nama='+nama);
});

//generate sertif (Untuk debug)
app.get('/sertif', function(req, res){
  res.sendFile( __dirname + "/html/" + "index.html" );
});

var server = app.listen(8081, function() {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://localhost", host, port)
});

//export sertif ke PDF
(async function(){
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
  process.exit();
})();
