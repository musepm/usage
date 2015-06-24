var Queue = require('./queue'),
    cn = require('../default.conf.json').dbconn,
    eventLog = require('./eventlog').createLog(cn);
   
var queue, data;

var init = () => {
  queue = new Queue('events');
}

var next = () => {
  queue.process( async (data, done) => {
    await eventLog.addEvent(data);
    done();
  });
}

init();
next();

