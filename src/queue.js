var kue = require('kue');

class Queue {
  constructor(type) {
    this.type = type;
    this.queue = kue.createQueue();
  }

  async add (data) {
    return await new Promise( res => {
      var job = this.queue.create(this.type, data)
      .save( err => {
        if (!err) res(job.id); else res(null);
      });
    });
  }

  process(fn) {
    this.queue.process(this.type, fn); 
  }
}

module.exports = Queue;
