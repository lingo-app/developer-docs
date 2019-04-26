---
title: Glossary
summary: Get familiar with the lingo of Lingo.
permalink: /guides/glossary
order: 105

slate: true
---

It's helpful to get familiar with the data model in Lingo before working with the API.

## Space

A space represents a collection of people and assets in Lingo. Each API token is created for a particular Space and is limited to accessing content within that Space.

Because API access is restricted to a space, they are never fetched via the API

## Kit

A kit contains a collection of assets which are organized in sections.

| Properties                                      |                                                           |
| ----------------------------------------------- | --------------------------------------------------------- |
| kit_uuid<span class="arg-type">string</span>    | The unique identifier for the kit                         |
| space_id<span class="arg-type">number</span>    | The id of the space that owns the kit.                    |
| name<span class="arg-type">string</span>        | The name of the kit.                                      |
| status<span class="arg-type">string</span>      | The status of the kit (always `active`).                  |
| use_version<span class="arg-type">string</span> | The recommended version of the kit.                       |
| images<span class="arg-type">object</span>      | If set, an object containing the cover image for the kit. |

## Kit Version

Multiple version of a kit can be created.

Every kit always has a "Shared Draft" which is version `0`.

| Properties                                             |                                                              |
| ------------------------------------------------------ | ------------------------------------------------------------ |
| kit_uuid<span class="arg-type">string</span>           | The unique identifier for the kit the version is in          |
| version<span class="arg-type">number</span>            | The numeric version.                                         |
| version_identifier<span class="arg-type">string</span> | A string identifier of the version.                          |
| notes<span class="arg-type">string</span>              | Release notes provided for the version.                      |
| status<span class="arg-type">string</span>             | The status of the version (always `active`).                 |
| counts<span class="arg-type">object</span>             | Counts of `items`, `assets`, and `sections` in this version. |

## Kit Outline

A kit outline provides an overview of the contents of kit version. It is a list of sections each of which include headings in that section.

| Properties                                                           |                                      |
| -------------------------------------------------------------------- | ------------------------------------ |
| kit_version<span class="arg-type">[Kit Version](#kit-version)</span> | The version the outline represents   |
| sections<span class="arg-type">[Section]</span>                      | An array of sections in the version. |

## Section

A kit contains a collection of assets which are organized in sections.

| Properties                                                   |                                                                      |
| ------------------------------------------------------------ | -------------------------------------------------------------------- |
| uuid<span class="arg-type">string</span>                     | The unique identifier for the kit                                    |
| version<span class="arg-type">number</span>                  | The numeric version the section belongs to.                          |
| name<span class="arg-type">string</span>                     | The name of the kit.                                                 |
| display_order<span class="arg-type">number</span>            | A relative order of the section in the version.                      |
| status<span class="arg-type">string</span>                   | The status of the section (always `active`).                         |
| counts<span class="arg-type">object</span>                   | Counts of `items`, `assets` in the section.                          |
| headers<span class="arg-type">[ [Heading](#heading) ]</span> | When fetching an outline, a section will contain a list of headings. |

## Heading

A heading is special type of [item](#item) that can be used to create a sense of hierarchy within Lingo.
In the outline these items include a subset of the data provided when fetching items directly.

| Properties                                        |                                                  |
| ------------------------------------------------- | ------------------------------------------------ |
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

| Properties                                                          |                                                                     |
| ------------------------------------------------------------------- | ------------------------------------------------------------------- |
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

A kit contains a collection of assets which are organized in sections.

| Properties                                                |                                                       |
| --------------------------------------------------------- | ----------------------------------------------------- |
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
| ---------------------------------------------- | ------------------------------------------ |
| name<span class="arg-type">string</span>       | The unique identifier for the kit          |
| hue<span class="arg-type">number</span>        | The hue value of the color (0-360).        |
| saturation<span class="arg-type">number</span> | The saturation value of the color (0-100). |
| brightness<span class="arg-type">number</span> | The brightness value of the color (0-100). |
| alpha<span class="arg-type">number</span>      | The alpha value of the color (0-100).      |

### AssetType

| File Type                    | Type               |
| ---------------------------- | ------------------ |
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
