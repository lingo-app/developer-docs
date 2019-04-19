---
title: Authentication
order: 103
section: topics

spaceID: 123
apiToken: wEJAz9dTsRG-CaE9W0r2vKOpKKZY-l48D6TOAXzDiJE
---

```javascript
const spaceID = {{ page.spaceID }};
const apiToken = "{{ page.apiToken }}";
lingo.setup(123, apiToken);
```

Before making any API calls call setup with your space and api token to use for authentication
