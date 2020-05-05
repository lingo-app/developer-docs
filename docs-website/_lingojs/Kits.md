---
title: Kits
order: 201
section: Content

kitID: 3BD9CDAF-14DF-495A-AA2F-4993092D62EE
---

## Get all Kits

```js
lingo.fetchKits().then(kits => {

  })
  .catch(err => {

  });
```

Returns a list of all kits in the space

## Kit Versions

```js
lingo.fetchKit('{{ page.kitID }}', 'versions').then(kits => {

}).catch(err => {

})
```

Returns a single kit and its versions


| Parameters                                        |                                                                                                        |
|---------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| id<span class="arg-type">string - required</span> | The uuid of the kit to fetch                                                                           |
| include<span class="arg-type">string</span>       | Optionally include the versions of the kit. Valid options include `versions`, `use_versions`, `empty`. |

### Include options
- `versions`: return all versions
- `use_versions`: The draft and, if different, the recommended version
- empty string: return only the kit, no versions


## Kit Outline

```js

lingo.fetchKitOutline('{{ page.kitID }}', 0).then(sections => {

}).catch(err => {

})
```

Retrieve the outline of a kit consisting of a list of sections and the headers within each section.


| Parameters                                        |                                  |
|---------------------------------------------------|----------------------------------|
| id<span class="arg-type">string - required</span> | The uuid of the kit to fetch     |
| version<span class="arg-type">integer</span>      | The version of the kit to fetch. |
