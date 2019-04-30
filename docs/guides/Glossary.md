---
title: Glossary
summary: Get familiar with the lingo of Lingo.
permalink: /guides/glossary/
order: 105

slate: true
---

It's helpful to get familiar with the data model in Lingo before working with the API.

> Note that the property names may change slightly in different API libraries.

---

## Space

A space represents a collection of people and assets in Lingo. Each API token is created for a particular Space and is limited to accessing content within that Space.

Because API access is restricted to a space, they are never returned.

## Kit

A kit contains a collection of assets which are organized in sections. In Lingo, access controls can be configured at this level, giving members of a space users access to individual kits.

All other objects below are all fetched within a kit.

This screenshot shows the kits as they appear in Lingo.
![Kits](../../images/glossary_kits.png)

| Properties                                      |                                                           |
|-------------------------------------------------|-----------------------------------------------------------|
| kit_uuid<span class="arg-type">string</span>    | The unique identifier for the kit                         |
| space_id<span class="arg-type">number</span>    | The id of the space that owns the kit.                    |
| name<span class="arg-type">string</span>        | The name of the kit.                                      |
| status<span class="arg-type">string</span>      | The status of the kit (always `active`).                  |
| use_version<span class="arg-type">string</span> | The recommended version of the kit.                       |
| images<span class="arg-type">object</span>      | If set, an object containing the cover image for the kit. |

## Kit Version

Multiple version of a kit can be created.

Every kit always has a "Shared Draft" which is version `0`. In Lingo only the Shared Draft can be updated, all other versions (1+) are immutable snapshots of the kit at the time the version is created.

![Versions](../../images/glossary_versions.png)

| Properties                                             |                                                              |
|--------------------------------------------------------|--------------------------------------------------------------|
| kit_uuid<span class="arg-type">string</span>           | The unique identifier for the kit the version is in          |
| version<span class="arg-type">number</span>            | The numeric version.                                         |
| version_identifier<span class="arg-type">string</span> | A string identifier of the version.                          |
| notes<span class="arg-type">string</span>              | Release notes provided for the version.                      |
| status<span class="arg-type">string</span>             | The status of the version (always `active`).                 |
| counts<span class="arg-type">object</span>             | Counts of `items`, `assets`, and `sections` in this version. |

## Kit Outline

A kit outline provides an overview of the contents of kit version. It is a list of sections each of which include headings in that section.

The outline is the only way to fetch the full list of [Sections](#section) in a kit.

The outline is used by Lingo to populate the kit navigator shown here. Notice below how the Headings in Lingo are displaying inline with other content as well as in the kit navigator under the section.
![Outline](../../images/glossary_outline.png)

| Properties                                                           |                                      |
|----------------------------------------------------------------------|--------------------------------------|
| kit_version<span class="arg-type">[Kit Version](#kit-version)</span> | The version the outline represents   |
| sections<span class="arg-type">[ [Section](#section) ]</span>        | An array of sections in the version. |

## Section

A kit contains a collection of assets which are organized in sections.

| Properties                                                   |                                                                      |
|--------------------------------------------------------------|----------------------------------------------------------------------|
| uuid<span class="arg-type">string</span>                     | The unique identifier for the kit                                    |
| version<span class="arg-type">number</span>                  | The numeric version the section belongs to.                          |
| name<span class="arg-type">string</span>                     | The name of the kit.                                                 |
| display_order<span class="arg-type">number</span>            | A relative order of the section in the version.                      |
| status<span class="arg-type">string</span>                   | The status of the section (always `active`).                         |
| counts<span class="arg-type">[string:number]</span>          | Counts of `items`, `assets` in the section.                          |
| headers<span class="arg-type">[ [Heading](#heading) ]</span> | When fetching an outline, a section will contain a list of headings. |

### Heading

A heading is special type of [item](#item) that can be used to create a visual hierarchy within Lingo.

Because headings are a type of [Item](#item), they are returned inline when fetching content in a section. In the outline these items include a subset of the data provided when fetching items directly.

| Properties                                        |                                                  |
|---------------------------------------------------|--------------------------------------------------|
| uuid<span class="arg-type">string</span>          | The unique identifier for the heading item       |
| version<span class="arg-type">number</span>       | The version number of the heading.               |
| name<span class="arg-type">string</span>          | The text of the heading.                         |
| display_order<span class="arg-type">number</span> | A relative order of the item within the section. |

## Item

A kit contains a collection of assets which are organized in sections.

Items can be one of three types:

- Asset
- Inline Note
- Heading

Inline notes and headings represent text and don't have an associated asset. The text content of those items is stored in the `data` property. In Javascript this looks like:

```js
const item = ... // fetched inline note
item.type; // inline_note
const note = item.data.content;
```

| Properties                                                          |                                                                     |
|---------------------------------------------------------------------|---------------------------------------------------------------------|
| uuid<span class="arg-type">string</span>                            | The unique identifier for the item                                  |
| kit_uuid<span class="arg-type">number</span>                        | The id of the kit the item is in.                                   |
| section_uuid<span class="arg-type">string</span>                    | the id of the section the item is in.                               |
| version<span class="arg-type">number</span>                         | The version number of the item.                                     |
| status<span class="arg-type">string</span>                          | The status of the item (always `active`).                           |
| display_order<span class="arg-type">number</span>                   | A relative order of the item in the section.                        |
| type<span class="arg-type">`asset`, `inline_note`, `heading`</span> | A relative order of the item in the section.                        |
| asset_uuid<span class="arg-type">string or null</span>              | If type is asset, the id of the asset.                              |
| data<span class="arg-type">object</span>                            | For headings and inline notes, access the text with `data.content`. |

## Asset

Assets represent the visual content of Lingo. Typically this is a file but in some cases assets are stored as data (i.e. colors).

Assets themselves have no relationship to a kit. [Item] objects manage that relationship. It may be important to note that a single asset can have multiple items in the same or different kits; In Lingo those we call those `References`.

| Properties                                                |                                                       |
|-----------------------------------------------------------|-------------------------------------------------------|
| uuid<span class="arg-type">string</span>                  | The unique identifier for the kit                     |
| type<span class="arg-type">[AssetType](#assettype)</span> | The id of the space that owns the kit.                |
| name<span class="arg-type">string</span>                  | The name of the asset.                                |
| notes<span class="arg-type">string</span>                 | Notes for the asset, if any.                          |
| keywords<span class="arg-type">string</span>              | A comma separated list of keywords.                   |
| colors<span class="arg-type">[ [Color](#color) ]</span>   | An array of colors for COLOR assets.                  |
| file_hash<span class="arg-type">string</span>             | A hash of the asset file (or color).                  |
| file_id<span class="arg-type">string</span>               | A unique identifier of the file.                      |
| size<span class="arg-type">number</span>                  | The size of the file in bytes, if any, otherwise `0`. |

<a id="color"></a>

### Color

Color assets contain a list of colors. Colors are stored in HSBA.

| Properties                                     |                                            |
|------------------------------------------------|--------------------------------------------|
| name<span class="arg-type">string</span>       | The unique identifier for the kit          |
| hue<span class="arg-type">number</span>        | The hue value of the color (0-360).        |
| saturation<span class="arg-type">number</span> | The saturation value of the color (0-100). |
| brightness<span class="arg-type">number</span> | The brightness value of the color (0-100). |
| alpha<span class="arg-type">number</span>      | The alpha value of the color (0-100).      |

### AssetType

| File Type                    | Type               |
|------------------------------|--------------------|
| SVG                          | SVG                |
| JPG                          | JPG                |
| PNG                          | PNG                |
| GIF                          | GIF                |
| EPS                          | EPS                |
| PDF                          | PDF                |
| EPS                          | EPS                |
| TIFIF                        | TIFF               |
| Text Style                   | TEXT_STYLE         |
| PowerPoint                   | PPTX               |
| PowerPoint Template          | POTX               |
| Word Document                | DOCX               |
| Word Template                | DOTX               |
| Ketynote                     | KETNOTE            |
| Ketnote Theme                | KETNOTE_THEME      |
| Pages Document               | PAGES              |
| Pages Template               | PAGES_TEMPLATE     |
| Photoshop Document           | PSD                |
| Illustrator                  | AI                 |
| Sketch Symbol                | SKETCH_SYMBOL      |
| Sketch Layer (e.g. artboard) | SKETCH_LAYER       |
| Sketch Layer Style           | SKETCH_LAYER_STYLE |
| Sketch Text Style            | SKETCH_TEXT_STYLE  |
| Color                        | COLOR              |
