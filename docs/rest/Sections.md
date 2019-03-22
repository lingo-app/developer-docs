---
title: Sections
order: 203
section: Content
---

```shell
curl -XGET 'https://123:wEJAz9dTsRG-CaE9W0r2vKOpKKZY-l48D6TOAXzDiJE@api.lingoapp.com/alpha/sections/B1F7A3DD-4E6E-4799-8673-4F857ECC388E?v=0&page=1&limit=50'

# Response
{
  "success": true,
  "result": {
    "section": {
      "kit_uuid": "3BD9CDAF-14DF-495A-AA2F-4993092D62EE",
      "name": "Brand",
      "status": "active",
      "uuid": "B1F7A3DD-4E6E-4799-8673-4F857ECC388E",
      "version": 0
      "counts": {
        "assets": 62,
        "items": 78
      },
      "creator_id": 4,
      "date_added": "2017-03-22 05:29:13.861927+0000",
      "date_updated": "2017-03-25 19:52:57.525252+0000",
      "display_order": 0,
      "items": [{
          "uuid": "D86B229B-0171-4EA3-893D-456760D3E8EF",
          "kit_uuid": "3BD9CDAF-14DF-495A-AA2F-4993092D62EE",
          "section_uuid": "B1F7A3DD-4E6E-4799-8673-4F857ECC388E",
          "space_id": 5,
          "asset_uuid": null,
          "data": {
            "content": "Logos",
            "display_size": "0"
          },
          "date_added": "2018-01-25 01:30:14.873405+0000",
          "date_updated": "2018-01-25 01:30:14.873405+0000",
          "display_order": -13,
          "status": "active",
          "type": "heading",
          "version": 0
      },
      {
          "uuid": "185DF077-1EC4-48F2-BCE0-62ED41B53D1E",
          "asset_uuid": "9CD0AFF5-B050-4B97-8E65-185F969686D5",
          "kit_uuid": "3BD9CDAF-14DF-495A-AA2F-4993092D62EE",
          "section_uuid": "B1F7A3DD-4E6E-4799-8673-4F857ECC388E",
          "space_id": 5,
          "data": {
            "display_size": "0"
          },
          "date_added": "2018-06-12 18:28:52.131982+0000",
          "date_updated": "2018-11-28 21:24:13.502812+0000",
          "display_order": 0,
          "status": "active",
          "type": "asset",
          "version": 0
          "asset": {
            "type": "SVG",
            "uploader_id": 4,
            "uuid": "9CD0AFF5-B050-4B97-8E65-185F969686D5"
            "category": "vector",
            "colors": [],
            "date_added": "2018-06-12 18:28:52.124741+0000",
            "date_updated": "2018-11-09 20:17:33.254285+0000",
            "dimensions": "192.0x192.0",
            "file_hash": "c8781d12183bb53c2c2c9d3ab4a6f9436acd8784",
            "file_id": "a26f993f-a07e-4c15-8eb5-02b6301028a8",
            "file_updated": "2018-06-12 18:28:52.124741+0000",
            "keywords": "Logo",
            "meta": {},
            "name": "Acme Logo",
            "notes": "",
            "size": 9361,
            "space_id": 5,
            "permalink": "https://api-test.lingoapp.com/v4/assets/9CD0AFF5-B050-4B97-8E65-185F969686D5/download",

            "thumbnail_placeholders": {
                "292": "https://lingo-test.s3.amazonaws.com/thumbnails/placeholder/svg/292x292.png",
                "480": "https://lingo-test.s3.amazonaws.com/thumbnails/placeholder/svg/480x480.png",
                "1232": "https://lingo-test.s3.amazonaws.com/thumbnails/placeholder/svg/1232x1232.png"
            },
            "thumbnails": {
                "292": "https://api-test.lingoapp.com/v4/assets/9CD0AFF5-B050-4B97-8E65-185F969686D5/preview?size=292",
                "480": "https://api-test.lingoapp.com/v4/assets/9CD0AFF5-B050-4B97-8E65-185F969686D5/preview?size=480",
                "1232": "https://api-test.lingoapp.com/v4/assets/9CD0AFF5-B050-4B97-8E65-185F969686D5/preview?size=1232"
            }
          }
        }
      ]
    }
  },
  "server_clock": 1548434315
}
```

`GET /sections/<section_uuid>/`

Retrieve the content within each section, paging through items as needed.

| Parameters                                                  |                                                          |
|-------------------------------------------------------------|----------------------------------------------------------|
| section_uuid<span class="arg-type">string - required</span> | The id of the section.                                   |
| version<span class="arg-type">integer</span>                | The version of the section/kit to fetch (default 0).     |
| page<span class="arg-type">integer</span>                   | The page number to retrieve when paging through results. |
| limit<span class="arg-type">integer</span>                  | The max number of items to retrieve (default 50).        |

