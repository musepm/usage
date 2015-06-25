'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _this = this;

var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    Queue = require('./queue'),
    eventsQueue = new Queue('events');

require('better-log').install();

app.use(bodyParser.json());

app.post('/events', function callee$0$0(req, res) {
  var jobid;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;

        console.log(req.body);
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(eventsQueue.add(req.body));

      case 4:
        jobid = context$1$0.sent;

        res.json({ status: 'ok', jobid: jobid });
        context$1$0.next = 11;
        break;

      case 8:
        context$1$0.prev = 8;
        context$1$0.t0 = context$1$0['catch'](0);

        res.json({ status: 'error', error: context$1$0.t0.message });

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this, [[0, 8]]);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});