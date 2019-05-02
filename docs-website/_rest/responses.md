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

## Error Codes

```js
{
  unknown: 1,
  serverError: 99,
  invalidParams: 103,
  unauthorized: 401,
  permissionDenied: 403,
  objectNotFound: 404,
  rateLimited: 429,

  kitNotFound: 1100,
  versionNotFound: 1200,
  sectionNotFound: 2100,
  assetNotFound: 3100,
  fileCutUnavailable: 3304,
};
```

Every lingo error will include one of the codes listed here. Note that most fetches will return a specific error for the type of object being fetched.
