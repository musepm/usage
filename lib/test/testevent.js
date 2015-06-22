'use strict';

var cn = require('../../default.conf.json').dbconn;

var eventLog = require('../eventlog').createLog(cn);

eventLog.addEvent({
  type: 'auth',
  appid: 'app01',
  result: 'ok'
});