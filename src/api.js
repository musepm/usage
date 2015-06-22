var koa = require('koa');
require('koa-router');

var cn = require('../../default.conf.json').dbconn;

var eventLog = require ('../eventlog').createLog(cn);

var app = koa(); 

var jsonBody = require('koa-json-body')({ limit: '10kb' });
 
app.post('/users', jsonBody, function *() {
  console.log(this.request.body);
  eventLog.addEvent(this.request.body);
});

app.listen(3000);
