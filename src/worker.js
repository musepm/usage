var Queue = require('./queue'),
    cn = require('../default.conf.json').dbconn,
    eventLog = require('./eventlog').createLog(cn);
   
require('better-log').install();

var queue, data;

var init = () => {
  queue = new Queue('events');
}

var next = () => {
  queue.process( async (next, done) => {
    await eventLog.addEvent(next.data);
    done();
  });
}

init();
next();

