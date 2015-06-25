var express = require('express'),
    bodyParser = require('body-parser'),   
    app = express(),
    Queue = require('./queue'),
    eventsQueue = new Queue('events');
    
require('better-log').install();

app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  try {
    console.log(req.body);
    var jobid = await eventsQueue.add(req.body);
    res.json({status:'ok', jobid});
  } catch (e) {
    res.json({status:'error', error: e.message});
  }
});

var server = app.listen(3000, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port); });
