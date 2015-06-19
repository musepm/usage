
var Queue = require('./queue'),
    EventLog = require('./eventlog');
   
var queue, data;

init = () => {
  queue = new Queue('events');
  data = new EventLog();
}

next = () => {
  queue.process( async (data, done) => {
    await data.addEvent(data);
    done();
  });
}

init();
next();

