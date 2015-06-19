var bunyan = require('bunyan');
var extend = require('extend');
var os     = require('os');

class PostgresEventStream {
  constructor(options) {
    this.options = options || {};

    try {
      this.sequelize = new Sequelize(options.conn'postgres://user:pass@example.com:5432/dbname');
    } catch (e) {
      throw new Error("Couldn't connect, try PostgresEventStream({conn: \"postgres://user:pass@example.com:5432/dbname\"})" + " conn string: " + options.conn + "; " + e.message); 
    }

    var Event = sequelize.define('event', {
      firstName: {
        type: Sequelize.STRING,
        field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
      },
        lastName: {
          type: Sequelize.STRING
        }
    }, {
      freezeTableName: true // Model tableName will be the same as the model name
    });

    Event.sync().then(function () {
      // Table created
      return Event.create({
        firstName: 'John',
             lastName: 'Hancock'
      });
    });
    this.client = null;
  }

  write(entry) {
    var level, rec, msg;

    if (typeof(entry) === 'string') {
      entry = JSON.parse(entry);
    }





    msg = {
      '@timestamp': rec.time.toISOString(),
      'message':    rec.msg,
      'tags':       this.tags,
      'source':     this.server + "/" + this.application,
      'level':      rec.level
    };

    if (typeof(this.type) === 'string') {
      msg.type = this.type;
    }

    delete rec.time;
    delete rec.msg;

    // Remove internal bunyan fields that won't mean anything outside of
    // a bunyan context.
    delete rec.v;
    delete rec.level;

    rec.pid = this.pid;

    this.send(JSON.stringify(extend({}, msg, rec), bunyan.safeCycles()));
  };

  LogstashStream.prototype.send = function logstashSend(message) {
    var self = this;
    var buf = new Buffer(message);

    if (! self.client) {
      self.client = dgram.createSocket('udp4');
      self.client.on("error", function (err) {
        var currentTimestamp = new Date().getTime()
        if (!lastErrorTimestamp || currentTimestamp - lastErrorTimestamp > 10000) {
          lastErrorTimestamp = currentTimestamp;
          console.log("bunyan-logstash socket connection error: " + err);
        }
      });
    }

    self.client.send(buf, 0, buf.length, self.port, self.host);
  }

  function createPostgresStream(options) {
    return new PostgresStream(options);
  };

  module.exports = {
    createStream: createPostgresEventStream,
    PostgresEventStream: PostgresEventStream
  };

