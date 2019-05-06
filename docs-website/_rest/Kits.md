---
title: Kits
order: 201
section: Content

spaceID: 123
apiToken: wEJAz9dTsRG-CaE9W0r2vKOpKKZY-l48D6TOAXzDiJE
kitID: 3BD9CDAF-14DF-495A-AA2F-4993092D62EE
kitName: Brand Kit
sectionID: B1F7A3DD-4E6E-4799-8673-4F857ECC388E
sectionName: Brand
headerID: D86B229B-0171-4EA3-893D-456760D3E8EF
---

## Get all Kits

```shell
curl -XGET 'https://{{ page.spaceID }}:{{ page.apiToken }}@api.lingoapp.com/1/kits/'
```

```js
// Response
{
  "result": {
    "success": true
    "kit": [{
      "kit_uuid": "{{ page.kitID }}",
      "space_id": 5,
      "name": "{{ page.kitName }}",
      "status": "active",
      "use_version": 0,
      "date_added": "2017-03-22 05:27:20.152243+0000",
      "date_updated": "2018-04-12 01:19:33.946433+0000",
      "images": {
        "cover": "https://lingo-test.s3.amazonaws.com:443/kits/5/{{ page.kitID }}/cover_1523495973.png"
      }
    },
    { ... }]
  },
  "server_clock": 1548434315
}
```

`GET /1/kits/`

Returns a list of all kits in the space

## Kit Versions

```shell
curl -XGET 'https://{{ page.spaceID }}:{{ page.apiToken }}api.lingoapp.com/1/kits/{{ page.kitID }}?include=use_versions'
```

```js
// Response
{
  "result": {
    "success": true
    "kit": {
      "kit_uuid": "{{ page.kitID }}",
      "space_id": 5235,
      "name": "{{ page.kitName }}",
      "status": "active",
      "use_version": 0,
      "date_added": "2017-03-22 05:27:20.152243+0000",
      "date_updated": "2018-04-12 01:19:33.946433+0000",
      "versions": [
        {
          "kit_uuid": "{{ page.kitID }}",
          "status": "active",
          "version": 0,
          "version_identifier": "0.0",
          "notes": "",
          "date_added": "2017-03-22 05:27:20.152243+0000",
          "date_updated": "2017-03-22 05:27:20.152243+0000",
          "counts": {
            "assets": 928,
            "items": 952,
            "sections": 8
          }
        }]
    }
  },
  "server_clock": 1548434315
}
```

`GET /1/kits/<kit_id>?include=<options>`

Returns a single kit and its versions

| Parameters                                        |                                                                                                        |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| id<span class="arg-type">string - required</span> | The uuid of the kit to fetch                                                                           |
| include<span class="arg-type">string</span>       | Optionally include the versions of the kit. Valid options include `versions`, `use_versions`, `empty`. |

### Include options

- `versions`: return all versions
- `use_versions`: The draft and, if different, the recommended version
- empty string: return only the kit, no versions

## Kit Outline

```shell
curl -XGET 'https://{{ page.spaceID }}:{{ page.apiToken }}api.lingoapp.com/1/kits/{{ page.kitID }}/outline?v=0'
```

```js
// Response
{
  "result": {
    "success": true
    "kit_version": {
      "kit_uuid": "{{ page.kitID }}",
      "status": "active",
      "version": 0,
      "version_identifier": "0.0",
      "notes": "",
      "date_added": "2017-03-22 05:27:20.152243+0000",
      "date_updated": "2017-03-22 05:27:20.152243+0000",
      "counts": {
        "assets": 125,
        "items": 247,
        "sections": 2
      }
      "sections": [{
          "name": "{{ page.sectionName }}",
          "uuid": "{{ page.sectionID }}",
          "version": 0
          "display_order": 0,
          "headers": [
            {
              "uuid": "{{ page.headerID }}",
              "display_order": -13,
              "name": "Logo",
              "version": 0
            },
            {
              "display_order": 6,
              "name": "Colors",
              "uuid": "B3F207C6-92E4-49AB-9416-44267ADD606E",
              "version": 0
            }
          ]
        },
        {
          "name": "Product",
          "uuid": "237CD43A-B42E-41DC-B00B-E4E88FF7F258",
          "version": 0
          "display_order": 1,
          "headers": [
            {
              "display_order": 22,
              "name": "Images",
              "uuid": "C5EAA76A-C5D7-4986-A4E7-0E4E415FC290",
              "version": 0
            }
          ]
        },
        ]
    }
  },
  "server_clock": 1548434315
}
```

`GET /1/kits/<kit_uuid>/outline/`

Retrieve the outline of a kit consisting of a list of sections and the headers within each section.

| Parameters                                        |                                  |
| ------------------------------------------------- | -------------------------------- |
| id<span class="arg-type">string - required</span> | The uuid of the kit to fetch     |
| version<span class="arg-type">integer</span>      | The version of the kit to fetch. |
