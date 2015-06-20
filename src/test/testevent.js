var cn = 'localhost';

var eventLog = require ('../eventlog').createLog(cn);

events.addEvent({
  type: 'auth',
  appid: 'app01',
  result: 'ok'
});
