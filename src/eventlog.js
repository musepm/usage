var postgresBunyan = require('./postgreslogger'),
    bunyan = require('bunyan');

class EventLog {
  constructor(conn) {
    var stream = postgresBunyan.createStream({conn}); 

    this.log = bunyan.createLogger( {
      streams: [ {type: "raw", stream: stream } ]
    });
  }

  addEvent(data) {
    if (data.result == 'fail') {
      this.log.error();
    } else {
      this.log.info(data)
    }
  }
}

exports.createLog = cn => {
  return new EventLog(cn);
}
