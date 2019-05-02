---
title: Error Codes
order: 105
section: topics
---

```js
lingo.fetchKit('deleted-kit-uuid').catch(err => {
  if (err.code == lingo.Error.Code.kitNotFound) {
    console.log("Oops, this kit isn't available")
  }
})

// The available error codes
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
