---
title: Requests & Responses
order: 105
section: topics
---

```js
// Success response
{
  "success": true,
  "result": {}
  "server_clock": timestamp
}

// Error response
{
  "success": false,
  "error": {
    "code": 1,
    "message": "An error occured"
  }
  "server_clock": timestamp
}
```

Every API response includes the same keys at the top level for success and error responses.
