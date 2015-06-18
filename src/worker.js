
var Queue = require('./queue'),
    EventLog = require('./eventlog');

let mod = {
  init: {
    mod.queue = new Queue('events');
    mod.data = new EventLog();
  },
  next: {
    mod.queue.process( (data, done) => {
      await mod.data.addEvent(data);
      done();
    });
  }
}

mod.init();
mod.next();

