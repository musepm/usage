'use strict';

var cn = require('../../default.conf.json').dbconn;

var eventLog = require('../eventlog').createLog(cn);

eventLog.addEvent({
  type: 'auth',
  appid: 'app01',
  accountid: 'jas01',
  result: 'ok'
});