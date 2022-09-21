---
title: Search
order: 204
section: Content

kitID: 3BD9CDAF-14DF-495A-AA2F-4993092D62EE
---


Search allows you to find differnt kinds of content including kits, wtctions and assets.

LingoJS uses a Search object to build and perform search queries.

## Context and Types

```js
const content = await lingo.search().fetch() // Default
const kits = await lingo.search().kits().fetch()
const sections = await lingo.search().sections().fetch()
const headings = await lingo.search().headings().fetch()
// Library
const assets = await lingo.search().assets().fetch()
const tags = await lingo.search().tags().fetch()

```

 The first thing to consider when building a search is the context and type of content you are looking for. By default results will include results for content within kits such as assets, notes and guides.

 You can also search kits, sections or headings only OR for assets and tags in the library.

 > Important: Only call one context function when building a search.

 > Note: `.assets()` will search assets in the library, not items in kits.

## Search Results

```
[
  {
    "type": "item",
    "object": {
      ...Item data
    }
  }
]
```

Each search context will return different types of objects in a wrapper object. For example, the default results will contain items (a note or an asset from a kit) while `.assets()` will return an asset and `.tags()` a tag object.

## Examples

### Searching For Kits

```js
const response = await lingo.search().kits().matchingKeyword("Brand").fetch()
const kits = response.results.map(res => res.object)
```

Returns a list of all kits matching "Brand".

### Searching Kit Content

```js

const result = await lingo.search()
  .inKit(kitId) // in a specific kit
  .matchingKeyword("Logo") // name, tag or description contains logo
  .withTag("branding") // has tag 'branding'
  .ofType("images") // an image type
  .after("2020-05-01") // created after may 1
  .before("2020-06-01"); // created before june 1
  .fetch()

console.log(`Found ${result.total} matches!`)
const items = result.results.map(res => res.object)
```



There are a few different filters you can use to narrow down your searches. This example makes use of all availble filters to find some logo/branding assets

Some filter functions can be called more than once. The resulting query in some cases will use an OR operator for those values. For example, `.ofType("JPG").ofType("PNG")` will look for JPG and PNG assets. Keyword and tag matches will produce an AND operator. The before and after filters should only be added once to any given searhc.

### Search Assets in the Library

```js

const result = await lingo.search()
  .assets() // search assets in the library
  .matchingKeyword("Logo") // name, tag or description contains logo
  .fetch()

console.log(`Found ${result.total} matches!`)
const assets = result.results.map(res => res.object)
```

The library provides access to all the assets that exist in your space.


### Search Tags in the Library

```js

const result = await lingo.search()
  .tags() // search tags in the library
  .matchingKeyword("Logo") // name, tag or description contains logo
  .fetch()

console.log(`Found ${result.total} matches!`)
const tags = result.results.map(res => res.object)
```

The library provides access to all the assets that exist in your space.
