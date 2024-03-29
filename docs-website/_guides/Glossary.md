---
title: Glossary
summary: Get familiar with the lingo of Lingo.
permalink: /guides/glossary/
order: 105

slate: true
---

> Note that the property names may change slightly in different API libraries.

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
| images<span class="arg-type">object</span>      | If set, an object containing the cover image for the kit. |
| kit_uuid<span class="arg-type">string</span>    | The unique identifier for the kit                         |
| name<span class="arg-type">string</span>        | The name of the kit.                                      |
| space_id<span class="arg-type">number</span>    | The id of the space that owns the kit.                    |
| status<span class="arg-type">string</span>      | The status of the kit (always `active`).                  |
| use_version<span class="arg-type">string</span> | The recommended version of the kit.                       |

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

| Properties                                                 |                                                                      |
|------------------------------------------------------------|----------------------------------------------------------------------|
| uuid<span class="arg-type">string</span>                   | The unique identifier for the kit                                    |
| version<span class="arg-type">number</span>                | The numeric version the section belongs to.                          |
| name<span class="arg-type">string</span>                   | The name of the kit.                                                 |
| display_order<span class="arg-type">number</span>          | A relative order of the section in the version.                      |
| status<span class="arg-type">string</span>                 | The status of the section (always `active`).                         |
| counts<span class="arg-type">[string:number]</span>        | Counts of `items`, `assets` in the section.                          |
| headers<span class="arg-type">[[Heading](#heading)]</span> | When fetching an outline, a section will contain a list of headings. |

### Outline Heading

A heading is special type of [item](#item) that can be used to create a visual hierarchy within Lingo. Because headings are a type of [Item](#item), they are also inlcuded when fetching content in a section.

When included in the [Kit Outline](kit-outline), headings are represented by a subset of the data provided when fetching items within a section.

| Properties                                        |                                                  |
|---------------------------------------------------|--------------------------------------------------|
| uuid<span class="arg-type">string</span>          | The unique identifier for the heading item       |
| version<span class="arg-type">number</span>       | The version number of the heading.               |
| name<span class="arg-type">string</span>          | The text of the heading.                         |
| display_order<span class="arg-type">number</span> | A relative order of the item within the section. |

## Item

A kit contains a collection of items which are organized in sections.

There are a few types of items:

- Asset: A file or color that is intended to be used by consumers of the kit
- Supporting Image: Non-usable images typically used to provide context to the assets.
- Inline Note: A note displayed inline with other content
- Heading: Larger text used to create separation between groups of content
- Code Snippet: A block of code to be displayed inline with other content
- Guide: A block of code to be displayed inline with other content

![Items](../../images/glossary_items.png)

| Properties                                                                                                       |                                                                     |
|------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------|
| uuid<span class="arg-type">string</span>                                                                         | The unique identifier for the item                                  |
| kit_uuid<span class="arg-type">number</span>                                                                     | The id of the kit the item is in.                                   |
| section_uuid<span class="arg-type">string</span>                                                                 | the id of the section the item is in.                               |
| version<span class="arg-type">number</span>                                                                      | The version number of the item.                                     |
| status<span class="arg-type">string</span>                                                                       | The status of the item (always `active`).                           |
| display_order<span class="arg-type">number</span>                                                                | A relative order of the item in the section.                        |
| type<span class="arg-type">`asset`, `inline_note`, `heading`, `supporting_image`, `code_snippet`, `guide`</span> | A relative order of the item in the section.                        |
| asset_uuid<span class="arg-type">string or null</span>                                                           | If type is `asset` or `supporting_image`, the uuid of the asset.    |
| asset<span class="arg-type">[Asset](#asset)</span>                                                               | If type is `asset` or `supporting_image`, the data for the asset.   |
| data<span class="arg-type">object</span>                                                                         | For headings and inline notes, access the text with `data.content`. |

### Item Data

The data object on an item contains different data depending on the type of the item.

| Properties                                           |                                                                            |
|------------------------------------------------------|----------------------------------------------------------------------------|
| content<span class="arg-type">string</span>          | The text content for text items, e.g. notes, headings, and code snippets.  |
| display_style<span class="arg-type">string</span>    | The style of the item, if any. (e.g. guides can be `image` or `text_only`) |
| display_size<span class="arg-type">number</span>     | The relative size to display the item at. (e.g. guides can be `1` or `2`)  |
| color<span class="arg-type">string</span>            | A color for the item, if any. (e.g. guides)                                |
| title<span class="arg-type">string</span>            | A title for the item, if any. (e.g. guides)                                |
| code_language<span class="arg-type">string</span>    | A title for the item, if any. (code snippets only)                         |
| background_color<span class="arg-type">string</span> | A title for the item, if any. (assets only)                                |

In Javascript, you might access the item content like this:

```js
const item = ... // fetched inline note
if (item.type == "asset" || item.type =="supporting_image") {
    const asset = item.asset;
} else if (item.type == "inline_note" || item.type == "heading") {
    const string = item.data.content;
} else if (item.type == "code_snippet") {
    const code = item.data.content;
    const lang = item.data.code_language; // may be null
} else if (item.type == "guide") {
    const title = item.data.title;
    const note = item.data.content;
    const asset = item.asset;
}
```

## Asset

Assets represent the visual content of Lingo. Typically this is a file but in some cases assets are stored as data (i.e. colors).

Assets themselves have no relationship to a kit. [Item](#item) objects manage that relationship. It may be important to note that a single asset can have multiple items in the same or different kits; In Lingo those we call those `References`.

| Properties                                                    |                                                       |
|---------------------------------------------------------------|-------------------------------------------------------|
| uuid<span class="arg-type">string</span>                      | The unique identifier for the kit                     |
| type<span class="arg-type">[AssetType](#assettype)</span>     | The id of the space that owns the kit.                |
| name<span class="arg-type">string</span>                      | The name of the asset.                                |
| notes<span class="arg-type">string</span>                     | Notes for the asset, if any.                          |
| keywords<span class="arg-type">string</span>                  | A comma separated list of keywords.                   |
| meta<span class="arg-type">[ [AssetMeta](#assetmeta) ]</span> | Extra data specific to certain asset types.           |
| colors<span class="arg-type">[ [Color](#color) ]</span>       | An array of colors for COLOR assets.                  |
| file_hash<span class="arg-type">string</span>                 | A hash of the asset file (or color).                  |
| file_id<span class="arg-type">string</span>                   | A unique identifier of the file.                      |
| size<span class="arg-type">number</span>                      | The size of the file in bytes, if any, otherwise `0`. |

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


<a id="assetmeta"></a>

### Asset Meta

The meta field on assets is used to store extra data specific to certain asset types.

| Properties                                   |                                                         |
|----------------------------------------------|---------------------------------------------------------|
| duration<span class="arg-type">number</span> | Video assets only.                                      |
| font<span class="arg-type">object</span>     | `text_style` assets only.                               |
| filecuts<span class="arg-type">object</span> | Available file cuts reflecting custom settings, if any. |

#### Filecuts

For assets that are exportable to different types, a filecut dictionary is included in the meta dictionary, that can be used to determine the allowed types and configuration for exports.

| Properties                                                                       |                                            |
|----------------------------------------------------------------------------------|--------------------------------------------|
| available_types<span class="arg-type">[[AvailableTypes](#availabletypes)]</span> | The filetypes available for custom exports |
| presets<span class="arg-type">[[Presets](#presets)]</span>                       | The export presets created for this asset  |

#### AvailableTypes

| Properties                                                |                                                                                                                    |
|-----------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| type<span class="arg-type">[AssetType](#assettype)</span> | The filetype that is available for custom exports                                                                  |
| enabled<span class="arg-type">bool</span>                 | If true, this filetype is available for custom exports. If false, this filetype is not available for custom export |
| resizable<span class="arg-type">bool</span>               | If true, the asset can resized when exported to this filetype. If false, it cannot be resized                      |

#### Presets

| Properties                                                |                                                                                                                                                                                                                                                                                                                                              |
|-----------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| type<span class="arg-type">[AssetType](#assettype)</span> | The filetype defined for this preset                                                                                                                                                                                                                                                                                                         |
| size<span class="arg-type">string</span>                  | The size for this custom export. By default, this is 1x. You can define a relative size (0.5x, 2x, etc), exact size (100x100), or single-side (100w, 100h). If the aspect ratio of the image differs from the provided dimensions, the asset will be resized maintaining the original aspect ratio, to fit within your specified dimensions. |
| description<span class="arg-type">string</span>           | The description for this preset, displayed in the UI.                                                                                                                                                                                                                                                                                        |


<a id="assettype"></a>

### AssetType

|  | File Type                    | Category      | Type               |
|--|------------------------------|---------------|--------------------|
|  | JPG                          | Raster        | JPG                |
|  | PNG                          | Raster        | PNG                |
|  | TIFF                         | Raster        | TIFF               |
|  | SVG                          | Vector        | SVG                |
|  | EPS                          | Vector        | EPS                |
|  | PDF                          | Vector        | PDF                |
|  | EPS                          | Vector        | EPS                |
|  | Color                        | Color         | COLOR              |
|  | GIF                          | Animation     | GIF                |
|  | Lottie                       | Animation     | LOTTIE             |
|  | MOV                          | Video         | MOV                |
|  | MP4                          | Video         | MP4                |
|  | MP3                          | Audio         | MP3                |
|  | M4A                          | Audio         | M4A                |
|  | WAV                          | Audio         | WAV                |
|  | Text Style                   | Font          | TEXT_STYLE         |
|  | Plain Text                   | Text Document | TXT                |
|  | Word Document                | Text Document | DOCX               |
|  | Word Template                | Text Document | DOTX               |
|  | Pages Document               | Text Document | PAGES              |
|  | Pages Template               | Text Document | PAGES_TEMPLATE     |
|  | PowerPoint                   | Presentation  | PPTX               |
|  | PowerPoint Template          | Presentation  | POTX               |
|  | Keynote                      | Presentation  | KEYNOTE            |
|  | Keynote Theme                | Presentation  | KEYNOTE_THEME      |
|  | Photoshop Document           | Adobe Design  | PSD                |
|  | Illustrator                  | Adobe Design  | AI                 |
|  | InDesign                     | Adobe Design  | INDD               |
|  | Sketch Symbol                | Sketch        | SKETCH_SYMBOL      |
|  | Sketch Layer (e.g. artboard) | Sketch        | SKETCH_LAYER       |
|  | Sketch Layer Style           | Sketch        | SKETCH_LAYER_STYLE |
|  | Sketch Text Style            | Sketch        | SKETCH_TEXT_STYLE  |
|  | Zip                          | Container     | ZIP                |
