# Overview

REST server to log API usage.  Supports HTTP
(and HTTP2 at some point.)  musepm clients
call this.

# Requirements

Postgres (logged data), redis (queue)

# Usage

POST /event/<appid> {JSON}

Body is JSON for event object:

```json
{
  timestamp: 1234567890123,
  ipaddr: '1.2.3.4',
  type: 'call',
  id: 'abcdef123456789',
  entity: 's3',
  action: 'upload',
  size: 234876,
  meta: ''
}
```

Response is event id.

