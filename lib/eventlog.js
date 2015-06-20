'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var postgresBunyan = require('./postgreslogger'),
    bunyan = require('bunyan');

var EventLog = (function () {
  function EventLog(conn) {
    _classCallCheck(this, EventLog);

    var stream = postgresBunyan.createStream({ conn: conn });

    this.log = bunyan.createLogger({
      streams: [{ type: 'raw', stream: stream }]
    });
  }

  _createClass(EventLog, [{
    key: 'addEvent',
    value: function addEvent(data) {
      if (data.result == 'fail') {
        this.log.error();
      } else {
        this.log.info(data);
      }
    }
  }]);

  return EventLog;
})();

exports.createLog = function (cn) {
  return new EventLog(cn);
};