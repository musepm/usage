var express = require('express'),
    bodyParser = require('body-parser'),
    eventLog = require('./eventlog'),
    app = express(),
    cn = require('./default.conf.json').dbconn,
    eventLog = require('./eventlog').createLog(cn);

app.use(bodyParser.json());

app.post('/events', (req, res) => {
  try {
    eventLog.addEvent(req.body);
    res.json({status:'ok'});
  } catch (e) {
    res.json({status:'error', error: e.message});
  }
});

var server = app.listen(3000, => {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port); });
