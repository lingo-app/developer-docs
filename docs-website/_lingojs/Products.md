---
title: Products
order: 205
section: Content

productTypeID: 7A1D2C3B-9E8F-4A5B-8C6D-0E1F2A3B4C5D
productID: C4F1E2D3-8B7A-4C6D-9E0F-1A2B3C4D5E6F
colorFieldID: 1A2B3C4D-5E6F-4071-8293-A4B5C6D7E8F9
sizeFieldID: 9F8E7D6C-5B4A-4392-8170-F6E5D4C3B2A1
optionID: 2B3C4D5E-6F70-4819-A2B3-C4D5E6F70819
marketID: 3C4D5E6F-7081-492A-B3C4-D5E6F708192A
---

Products are structured records made up of fields defined by a product type. Each product has one or more variants (SKUs) which inherit the product's field values and can override them. See [Products](/rest#products) in the REST reference for the full data model.

> Products are available to spaces with the PIM feature.

## Listing Products

```js
const { products, total } = await lingo
  .products()
  .ofType("{{ page.productTypeID }}")
  .includeVariants()
  .sortBy("name")
  .limit(100)
  .fetch();
```

LingoJS uses a query object to list and filter products. Build the query, then call `fetch` to retrieve a page of results, or `fetchAll` to page through every match.

| Options                                                  |                                                                                      |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| ofType<span class="arg-type">string</span>               | Only products of the given product type uuid.                                        |
| status<span class="arg-type">string</span>               | `active` (default) or `archived`.                                                    |
| includeVariants<span class="arg-type">boolean</span>     | Include each product's variants (default false).                                     |
| sortBy<span class="arg-type">string, boolean</span>      | Sort by `name`, `product_type`, `date_added`, `date_updated`, `options`, `variants` or `markets`. Pass `true` to reverse. |
| page<span class="arg-type">integer</span>                | The page to fetch (default 1).                                                       |
| limit<span class="arg-type">integer</span>               | Products per page, up to 200 (default 50).                                           |
| nextPage<span class="arg-type"></span>                   | Advance to the next page before calling `fetch` again.                               |

## Filtering Products

```js
const { products } = await lingo
  .products()
  .matchingName("jacket")
  .inMarket("{{ page.marketID }}")
  .whereText("{{ page.colorFieldID }}", "contains", "Forest")
  .whereSelect("{{ page.sizeFieldID }}", "in", ["{{ page.optionID }}"])
  .fetch();

for (const product of products) {
  // The variants that caused the match, when filtering by name or field
  console.log(product.matchedVariants);
}
```

A product matches when the product itself or any of its variants matches every filter. Field filters take the field's uuid, which you can find on the product type's `fields`.

| Filters                                                                            |                                                                                              |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| matchingName<span class="arg-type">string</span>                                   | Product or variant name contains the value.                                                  |
| inMarket<span class="arg-type">string or null</span>                               | Products in a market, or with no market when `null` is passed.                               |
| whereText<span class="arg-type">fieldUuid, operator, value</span>                  | Operators: `contains`, `is_set`, `is_empty`.                                                 |
| whereNumber<span class="arg-type">fieldUuid, operator, value, value2</span>        | Operators: `eq`, `gt`, `gte`, `lt`, `lte`, `between`, `is_set`, `is_empty`. Send numbers as strings. |
| whereDate<span class="arg-type">fieldUuid, operator, value, value2</span>          | Operators: `eq`, `before`, `after`, `between`, `is_set`, `is_empty`. Dates are `yyyy-mm-dd`.  |
| whereBoolean<span class="arg-type">fieldUuid, value</span>                         | `true`, `false`, `is_set` or `is_empty`.                                                     |
| whereSelect<span class="arg-type">fieldUuid, operator, optionUuids</span>          | Operators: `in`, `is_set`, `is_empty`.                                                       |
| whereMultiselect<span class="arg-type">fieldUuid, operator, optionUuids, match</span> | Operators: `in`, `is_set`, `is_empty`. `match` is `any` (default) or `all`.               |

## Fetch All Products

```js
const products = await lingo.products().ofType("{{ page.productTypeID }}").fetchAll();
```

A utility to fetch every product matching a query. The API limits each page to 200 products; `fetchAll` pages through them and returns the full list.

## Fetch a Product

```js
const product = await lingo.fetchProduct("{{ page.productID }}");
const name = product.fields.product_name.value;
for (const variant of product.variants) {
  console.log(variant.optionValues, variant.fields.sku.value);
}
```

Fetch a single product with its product type, every non-deleted variant (including hidden ones), its markets, and the kit items that place it.

Keys in `fields` are the product type's field identifiers and keys in `optionValues` are field names. Unlike other properties, these are returned exactly as defined in Lingo rather than camel cased.

| Parameters                                          |                          |
| --------------------------------------------------- | ------------------------ |
| uuid<span class="arg-type">string - required</span> | The uuid of the product. |

## Product Types

```js
const { productTypes, total } = await lingo.fetchProductTypes();
const productType = await lingo.fetchProductType("{{ page.productTypeID }}");
const colorField = productType.fields.find(f => f.identifier === "color");
```

Product types define the fields a product can have. Each field has an `identifier` used as the key in product and variant `fields`, and select fields carry their `options`.

| Parameters                                 |                                                                           |
| ------------------------------------------ | ------------------------------------------------------------------------- |
| page<span class="arg-type">integer</span>  | The page to fetch (default 1).                                            |
| limit<span class="arg-type">integer</span> | Product types per page, up to 200 (default 50).                           |
| sort<span class="arg-type">string</span>   | `name`, `date_added`, `fields` or `products`. Prefix with `-` to reverse. |

## Markets

```js
const { markets, total } = await lingo.fetchMarkets();
```

List the markets in your space. Products and variants reference markets by `marketUuid`.

| Parameters                                 |                                                                          |
| ------------------------------------------ | ------------------------------------------------------------------------ |
| page<span class="arg-type">integer</span>  | The page to fetch (default 1).                                           |
| limit<span class="arg-type">integer</span> | Markets per page, up to 200 (default 50).                                |
| sort<span class="arg-type">string</span>   | `name`, `notes`, `date_added` or `products`. Prefix with `-` to reverse. |

## Products in Kits

```js
const items = await lingo.fetchAllItemsInSection(sectionUuid);
const products = items.filter(item => item.type === ItemType.Product).map(item => item.product);
```

Products placed in a kit appear as items of type `product`. When fetching a section, each product item carries its `product` with variants included.
