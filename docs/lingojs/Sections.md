---
title: Sections
order: 202
section: Content
---

```js
lingo.fetchSection('B1F7A3DD-4E6E-4799-8673-4F857ECC388E', 0).then(section => {

}).catch(err => {

})
```

Retrieve the content within each section, paging through items as needed.

| Parameters                                        |                                                                      |
|---------------------------------------------------|----------------------------------------------------------------------|
| id<span class="arg-type">string - required</span> | The id of the section.                                               |
| version<span class="arg-type">integer</span>      | The version of the section/kit to fetch.                             |
| page<span class="arg-type">integer</span>         | The page number to retrieve when paging through results (default 1). |
| limit<span class="arg-type">integer</span>        | The max number of items to retrieve (default 50).                    |


## Heading Contents

```js
lingo.fetchAssetsForHeading('B1F7A3DD-4E6E-4799-8673-4F857ECC388E', 'D86B229B-0171-4EA3-893D-456760D3E8EF').then(items => {

}).catch(err => {

})
```

Retrieve the content within a section that fall under a particular heading.

| Parameters                                               |                                                                              |
|----------------------------------------------------------|------------------------------------------------------------------------------|
| sectionId<span class="arg-type">string - required</span> | The id of the section.                                                       |
| headingId<span class="arg-type">string - required</span> | The id or name of the section. Note that with name, the first match is used. |
| version<span class="arg-type">integer</span>             | The version of the section/kit to fetch.                                     |
