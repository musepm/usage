'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var kue = require('kue');

var Queue = (function () {
  function Queue(type) {
    _classCallCheck(this, Queue);

    this.type = type;
    this.queue = kue.createQueue();
  }

  _createClass(Queue, [{
    key: 'add',
    value: function add(data) {
      return _regeneratorRuntime.async(function add$(context$2$0) {
        var _this = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(new _Promise(function (res) {
              var job = _this.queue.create(_this.type, data).save(function (err) {
                if (!err) res(job.id);else res(null);
              });
            }));

          case 2:
            return context$2$0.abrupt('return', context$2$0.sent);

          case 3:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'process',
    value: function process(fn) {
      this.queue.process(this.type, fn);
    }
  }]);

  return Queue;
})();

module.exports = Queue;