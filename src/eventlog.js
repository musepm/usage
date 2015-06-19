class EventLog {
  constructor() {
    this.log = bunyan.createLogger(

    )
  }

  addEvent(data) {
    if (data.status == 'fail') {
      log.error();
    } else {
      log.info(data)
    }
  }
}
