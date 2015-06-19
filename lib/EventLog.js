'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var EventLog = (function () {
  function EventLog() {
    _classCallCheck(this, EventLog);

    this.log = bunyan.createLogger();
  }

  _createClass(EventLog, [{
    key: 'addEvent',
    value: function addEvent(data) {
      if (data.status == 'fail') {
        log.error();
      } else {
        log.info(data);
      }
    }
  }]);

  return EventLog;
})();