'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _this = this;

var Queue = require('./queue'),
    cn = require('../default.conf.json').dbconn,
    eventLog = require('./eventlog').createLog(cn);

var queue, data;

var init = function init() {
  queue = new Queue('events');
};

var next = function next() {
  queue.process(function callee$1$0(data, done) {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(eventLog.addEvent(data));

        case 2:
          done();

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
};

init();
next();