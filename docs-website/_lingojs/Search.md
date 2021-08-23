---
title: Search
order: 204
section: Content

kitID: 3BD9CDAF-14DF-495A-AA2F-4993092D62EE
---


Lingo search provides a powerful way to find content.

LingoJS uses a object to make it easy to build and perform search queries. Before getting into the details it's important to know that there are a few main types of content you can search for:

* Kits
* Sections
* Headings
* Content

Kits, sections and headings are organization objects in Lingo which can be used to fetch groups of content. Searching for them through the API can be useful if you aren't sure exactly which kit or section you need to fetch from.

## Searching For Kits

```js
const response = await lingo.search().kits().matchingKeyword("Brand").fetch()
const kits = response.results.map(res => res.object)
```

Returns a list of all kits matching "Brand". Similiarly you can call `.sections()` or `.headings()` to search for those. By default a search will return content results so you don't need to do anything there, though you can call `.content()` if you'd like.

Beacuse search can return different types of objects in the same array, each result is wrapped in an object with two kets: `type` and `object`. In the example above we can assume that all the obejcts will be kits since we specifcially restricted the query to `.kits()`.


## Filters

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