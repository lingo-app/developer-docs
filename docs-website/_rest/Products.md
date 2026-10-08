---
title: Products
order: 207
section: Content

spaceID: 123
apiToken: wEJAz9dTsRG-CaE9W0r2vKOpKKZY-l48D6TOAXzDiJE
productTypeID: 7A1D2C3B-9E8F-4A5B-8C6D-0E1F2A3B4C5D
productID: C4F1E2D3-8B7A-4C6D-9E0F-1A2B3C4D5E6F
variantID: 5D6E7F80-91A2-4B3C-8D4E-5F6A7B8C9D0E
nameFieldID: 0F1E2D3C-4B5A-4968-8776-655443322110
colorFieldID: 1A2B3C4D-5E6F-4071-8293-A4B5C6D7E8F9
sizeFieldID: 9F8E7D6C-5B4A-4392-8170-F6E5D4C3B2A1
optionID: 2B3C4D5E-6F70-4819-A2B3-C4D5E6F70819
marketID: 3C4D5E6F-7081-492A-B3C4-D5E6F708192A
assetID: 9CD0AFF5-B050-4B97-8E65-185F969686D5
---

Products are structured records made up of fields defined by a product type. Each product has one or more variants (SKUs) which inherit the product's field values and can override them.

> Products are available to spaces with the PIM feature. Requests return `permission_denied` otherwise.

## List Products

```shell
curl -XGET 'https://{{ page.spaceID }}:{{ page.apiToken }}@api.lingoapp.com/1/products?page=1&limit=50&sort=-date_added'
```

```js
// Response
{
  "success": true,
  "result": {
    "products": [
      {
        "uuid": "{{ page.productID }}",
        "space_id": {{ page.spaceID }},
        "source_uuid": null,
        "product_type_uuid": "{{ page.productTypeID }}",
        "name": "Trail Jacket",
        "status": "active",
        "counts": { "variants": 2, "active_variants": 2, "options": 1, "markets": 1 },
        "fields": {
          "product_name": { "value": "Trail Jacket", "source": null },
          "color": { "value": "Forest", "source": null },
          "images": {
            "assets": [
              {
                "asset_uuid": "{{ page.assetID }}",
                "display_order": 0,
                "inherited": false,
                "asset": { "uuid": "{{ page.assetID }}", "type": "JPG", "name": "trail-jacket.jpg" }
              }
            ],
            "source": null
          }
        },
        "options": [{ "field_uuid": "{{ page.sizeFieldID }}", "display_order": 0 }],
        "market_uuid": "{{ page.marketID }}",
        "creator_id": 4,
        "date_added": "2026-03-02T18:04:11Z",
        "date_updated": "2026-03-09T09:12:40Z",
        "preview_asset": { "uuid": "{{ page.assetID }}", "type": "JPG", "name": "trail-jacket.jpg" },
        "product_type": {
          "uuid": "{{ page.productTypeID }}",
          "name": "Apparel",
          "fields": [
            { "uuid": "{{ page.nameFieldID }}", "name": "Product Name", "identifier": "product_name", "field_type": "name", "required": true, "options": [] },
            { "uuid": "{{ page.colorFieldID }}", "name": "Color", "identifier": "color", "field_type": "text", "required": false, "options": [] },
            { "uuid": "{{ page.sizeFieldID }}", "name": "Size", "identifier": "size", "field_type": "select", "required": false,
              "options": [{ "uuid": "{{ page.optionID }}", "value": "m", "label": "M", "display_order": 0 }] }
          ]
        }
      }
    ],
    "total": 1
  },
  "server_clock": 1772647200
}
```

`GET /1/products`

List the products in your space. Each product includes its `product_type` (with field definitions) and a `preview_asset`. Variants are omitted unless requested with `include=variants`.

| Parameters                                              |                                                                                                                     |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| page<span class="arg-type">integer</span>               | The page number to retrieve when paging through results (default 1).                                                |
| limit<span class="arg-type">integer</span>              | The max number of products to retrieve, up to 200 (default 50).                                                     |
| sort<span class="arg-type">string</span>                | `name`, `product_type`, `date_added`, `date_updated`, `options`, `variants` or `markets`. Prefix with `-` to reverse (default `-date_added`). |
| status<span class="arg-type">string</span>              | `active` or `archived`. By default only active products are returned.                                              |
| product_type_uuid<span class="arg-type">string</span>   | Only products of this product type.                                                                                 |
| include<span class="arg-type">string</span>             | `variants` to include each product's variants.                                                                      |
| filters<span class="arg-type">string</span>             | A base64 encoded JSON array of [filters](#product-filters).                                                         |

### Product Filters

```js
// Decoded value of the filters parameter
[
  { "type": "name", "value": "jacket" },
  { "type": "market", "market_uuid": "{{ page.marketID }}" },
  { "type": "field-text", "field_uuid": "{{ page.colorFieldID }}", "operator": "contains", "value": "Forest" },
  { "type": "field-select", "field_uuid": "{{ page.sizeFieldID }}", "operator": "in", "option_uuids": ["{{ page.optionID }}"] }
]
```

A product matches when the product itself or any of its variants matches every filter. When name or field filters are used, each product gains a `matched_variants` list of `{ uuid, option_values }` for the variants that caused the match.

| Filter                                                  |                                                                                                                                   |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| name<span class="arg-type">value</span>                 | Product or variant name contains the value.                                                                                       |
| status<span class="arg-type">value</span>               | `active` or `archived`.                                                                                                           |
| product_type<span class="arg-type">product_type_uuid</span> | Products of the given type.                                                                                                   |
| market<span class="arg-type">market_uuid or is_null</span> | Products in a market, or with no market when `is_null` is `true`.                                                              |
| field-text<span class="arg-type">field_uuid, operator, value</span> | Operators: `contains`, `is_set`, `is_empty`.                                                                          |
| field-number<span class="arg-type">field_uuid, operator, value, value2</span> | Operators: `eq`, `gt`, `gte`, `lt`, `lte`, `between` (uses `value2`), `is_set`, `is_empty`. Send numbers as strings. |
| field-date<span class="arg-type">field_uuid, operator, value, value2</span> | Operators: `eq`, `before`, `after`, `between` (uses `value2`), `is_set`, `is_empty`. Dates are `yyyy-mm-dd`.           |
| field-boolean<span class="arg-type">field_uuid, operator, value</span> | Operators: `eq` (with `value` `true` or `false`), `is_set`, `is_empty`.                                               |
| field-select<span class="arg-type">field_uuid, operator, option_uuids</span> | Operators: `in`, `is_set`, `is_empty`.                                                                           |
| field-multiselect<span class="arg-type">field_uuid, operator, option_uuids, match</span> | Operators: `in`, `is_set`, `is_empty`. `match` is `any` (default) or `all`.                       |

## Fetch a Product

```shell
curl -XGET 'https://{{ page.spaceID }}:{{ page.apiToken }}@api.lingoapp.com/1/products/{{ page.productID }}'
```

```js
// Response
{
  "success": true,
  "result": {
    "product": {
      "uuid": "{{ page.productID }}",
      "name": "Trail Jacket",
      "status": "active",
      "fields": { ... },
      "options": [{ "field_uuid": "{{ page.sizeFieldID }}", "display_order": 0 }],
      "product_type": { ... },
      "variants": [
        {
          "uuid": "{{ page.variantID }}",
          "product_uuid": "{{ page.productID }}",
          "status": "active",
          "availability": "available",
          "option_values": { "Size": "M" },
          "fields": {
            "product_name": { "value": "Trail Jacket", "source": "inherited" },
            "color": { "value": "Forest", "source": "inherited" },
            "size": { "option": { "uuid": "{{ page.optionID }}", "value": "m", "label": "M" }, "source": "override" },
            "sku": { "value": "TJ-FOR-M", "source": "override" }
          },
          "market_uuid": null,
          "computed_market_uuid": "{{ page.marketID }}",
          "display_order": 0
        }
      ],
      "markets": [{ "uuid": "{{ page.marketID }}", "name": "North America", "status": "active" }],
      "items": [
        {
          "uuid": "185DF077-1EC4-48F2-BCE0-62ED41B53D1E",
          "type": "product",
          "product_uuid": "{{ page.productID }}",
          "section": { ... },
          "kit_version": { ... },
          "kit": { ... },
          "item": null
        }
      ]
    }
  },
  "server_clock": 1772647200
}
```

`GET /1/products/<product_uuid>`

Fetch a single product with its product type, every non-deleted variant (including hidden ones), the markets it and its variants reference, and the kit items that place it.

| Parameters                                                  |                         |
| ----------------------------------------------------------- | ----------------------- |
| product_uuid<span class="arg-type">string - required</span> | The uuid of the product. |

### Field Values

Every entry in `fields` is keyed by the field's `identifier` and carries a `source`. On products `source` is always `null`. On variants it is `"override"` when the variant holds its own value and `"inherited"` when the value comes from the product.

| Field type                                                 | Shape                                                                                   |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| text, name, description, sku, date, boolean                | `{ "value": ..., "source": ... }`                                                       |
| number, price                                              | `{ "value": "22.50", "source": ... }` — a fixed-point string using the field's decimals |
| select                                                     | `{ "option": { "uuid", "value", "label" }, "source": ... }`                             |
| multiselect                                                | `{ "options": [ { "uuid", "value", "label" } ], "source": ... }`                        |
| asset, images                                              | `{ "assets": [ { "asset_uuid", "display_order", "inherited", "asset" } ], "source": ... }` |

## List Product Types

```shell
curl -XGET 'https://{{ page.spaceID }}:{{ page.apiToken }}@api.lingoapp.com/1/product-types'
```

```js
// Response
{
  "success": true,
  "result": {
    "product_types": [
      {
        "uuid": "{{ page.productTypeID }}",
        "space_id": {{ page.spaceID }},
        "name": "Apparel",
        "description": "Clothing and outerwear",
        "status": "active",
        "counts": { "fields": 4, "products": 12 },
        "fields": [
          {
            "uuid": "{{ page.colorFieldID }}",
            "product_type_uuid": "{{ page.productTypeID }}",
            "name": "Color",
            "identifier": "color",
            "field_type": "text",
            "required": false,
            "status": "active",
            "display_order": 1,
            "options": [],
            "config": {}
          }
        ],
        "date_added": "2026-01-14T16:20:00Z",
        "date_updated": "2026-02-20T11:03:52Z"
      }
    ],
    "total": 1
  },
  "server_clock": 1772647200
}
```

`GET /1/product-types`

List the product types in your space, each with its field definitions.

| Parameters                                 |                                                                                               |
| ------------------------------------------ | --------------------------------------------------------------------------------------------- |
| page<span class="arg-type">integer</span>  | The page number to retrieve when paging through results (default 1).                          |
| limit<span class="arg-type">integer</span> | The max number of product types to retrieve, up to 200 (default 50).                          |
| sort<span class="arg-type">string</span>   | `name`, `date_added`, `fields` or `products`. Prefix with `-` to reverse.                     |

## Fetch a Product Type

```shell
curl -XGET 'https://{{ page.spaceID }}:{{ page.apiToken }}@api.lingoapp.com/1/product-types/{{ page.productTypeID }}'
```

`GET /1/product-types/<product_type_uuid>`

Fetch a single product type with its field definitions.

| Parameters                                                       |                              |
| ---------------------------------------------------------------- | ---------------------------- |
| product_type_uuid<span class="arg-type">string - required</span> | The uuid of the product type. |

## List Markets

```shell
curl -XGET 'https://{{ page.spaceID }}:{{ page.apiToken }}@api.lingoapp.com/1/markets'
```

```js
// Response
{
  "success": true,
  "result": {
    "markets": [
      {
        "uuid": "{{ page.marketID }}",
        "space_id": {{ page.spaceID }},
        "name": "North America",
        "notes": null,
        "status": "active",
        "display_order": 0,
        "counts": { "products": 12 },
        "date_added": "2026-01-14T16:22:09Z",
        "date_updated": "2026-01-14T16:22:09Z"
      }
    ],
    "total": 1
  },
  "server_clock": 1772647200
}
```

`GET /1/markets`

List the markets in your space. Products and variants reference markets by `market_uuid`.

| Parameters                                 |                                                                           |
| ------------------------------------------ | ------------------------------------------------------------------------- |
| page<span class="arg-type">integer</span>  | The page number to retrieve when paging through results (default 1).      |
| limit<span class="arg-type">integer</span> | The max number of markets to retrieve, up to 200 (default 50).            |
| sort<span class="arg-type">string</span>   | `name`, `notes`, `date_added` or `products`. Prefix with `-` to reverse.  |
