'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _this = this;

var Queue = require('./queue'),
    EventLog = require('./eventlog');

var queue, data;

init = function () {
  queue = new Queue('events');
  data = new EventLog();
};

next = function () {
  queue.process(function callee$1$0(data, done) {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(data.addEvent(data));

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