---
title: Sections
order: 202
section: Content

kitID: 3BD9CDAF-14DF-495A-AA2F-4993092D62EE
sectionID: B1F7A3DD-4E6E-4799-8673-4F857ECC388E
headerID: D86B229B-0171-4EA3-893D-456760D3E8EF
---

## Fetch A Section

```js
lingo
  .fetchSection("{{ page.sectionID }}", 0)
  .then(section => {})
  .catch(err => {});
```

Retrieve a section and optionally the items with it, paging through items as needed.

| Parameters                                        |                                                                                |
| ------------------------------------------------- | ------------------------------------------------------------------------------ |
| id<span class="arg-type">string - required</span> | The id of the section.                                                         |
| version<span class="arg-type">integer</span>      | The version of the section/kit to fetch. (default 0)                           |
| page<span class="arg-type">integer</span>         | The page number to retrieve when paging through results (default 1).           |
| limit<span class="arg-type">integer</span>        | The max number of items to retrieve, up to 200 or 0 for no items (default 50). |

## Fetch All Section Items

```js
lingo
  .fetchAllItemsInSection("{{ page.sectionID }}", 0)
  .then(items => {})
  .catch(err => {});
```

A utility function to fetch all items in a section.

The API limits item fetches to 200. This function recursively calls `fetchSection` until all items have been retrieved then returns the full list of items.

To manually page through items, use `fetchSection`.

| Parameters                                        |                                                      |
| ------------------------------------------------- | ---------------------------------------------------- |
| id<span class="arg-type">string - required</span> | The id of the section.                               |
| version<span class="arg-type">integer</span>      | The version of the section/kit to fetch. (default 0) |

## Heading Contents

```js
lingo
  .fetchItemsForHeading("{{ page.sectionID }}", "{{ page.headerID }}")
  .then(items => {})
  .catch(err => {});
```

Retrieve the content within a section that fall under a particular heading.

| Parameters                                               |                                                                              |
| -------------------------------------------------------- | ---------------------------------------------------------------------------- |
| sectionId<span class="arg-type">string - required</span> | The id of the section.                                                       |
| headingId<span class="arg-type">string - required</span> | The id or name of the section. Note that with name, the first match is used. |
| version<span class="arg-type">integer</span>             | The version of the section/kit to fetch.                                     |
