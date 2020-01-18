var express = require('express');
var app = express();
const puppeteer = require('puppeteer');
const fs = require('fs-extra');

app.use(express.static('public'));
app.get('/', function (req, res) {
  res.sendFile( __dirname + "/html/" + "index.html" );
});

var server = app.listen(8081, function() {
  var host = server.address().address
  var port = server.address().port


  console.log("Example app listening at http://localhost", host, port)
});

(async function(){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:8081/");
  await page.emulateMedia('screen');
  await page.pdf({
    path: 'sertif.pdf',
    format: 'A4',
    printBackground: true,
    landscape: true
  });

  console.log('done');
  await browser.close();
  process.exit();
})();
