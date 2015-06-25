var bunyan = require('bunyan'),
    Sequelize = require('sequelize'),
    Event = null;

require('better-log').install();
 
class PostgresEventStream {
  constructor(options) {
    this.options = options || {};

    try {
      this.sequelize = new Sequelize(options.conn);
    } catch (e) {
      throw new Error("Couldn't connect, try PostgresEventStream({conn: \"postgres://user:pass@example.com:5432/dbname\"})" + " conn string: " + options.conn + "; " + e.message); 
    }

    Event = this.sequelize.define('event', {
      type: {
        type: Sequelize.STRING,
        field: 'Type'
      },
      result: {
        type: Sequelize.STRING,
        field: 'Result'
      },
      intipaddr: {
        type: Sequelize.STRING,
        field: 'IntIPAddr'
      },
      extipaddr: {
        type: Sequelize.STRING,
        field: 'ExtIPAddr'
      },
      appid: {
        type: Sequelize.STRING,
        field: 'AppID'
      },
      entity: {
        type: Sequelize.STRING,
        field: 'Entity'
      },
      action: {
        type: Sequelize.STRING,
        field: 'Action'
      },
      size: {
        type: Sequelize.INTEGER,
        field: 'Size'
      },
      descr: {
        type: Sequelize.STRING,
        field: 'Descr'
      },
      meta: {
        type: Sequelize.STRING,
        field: 'Meta'
      }
    });

    Event.sync();
    this.client = null;
  }

  write(entry) {
    if (typeof(entry) === 'string') {
      entry = JSON.parse(entry);
    }
    console.log('logger');
    console.log(entry);
    var record = {
      type : entry.type,
      result: entry.result,
      intipaddr: entry.ipaddr,
      extipaddr: entry.extipaddr,
      appid: entry.appid,
      entity: entry.entity,
      action: entry.action,  
      size: entry.size,
      descr: entry.descr,
      meta: entry.meta
    };
    Event.create(record);
  }
}

function createPostgresEventStream(options) {
  return new PostgresEventStream(options);
};

module.exports = {
  createStream: createPostgresEventStream,
  PostgresEventStream: PostgresEventStream
};

