---
title: Assets
order: 205
section: Content

spaceID: 123
apiToken: wEJAz9dTsRG-CaE9W0r2vKOpKKZY-l48D6TOAXzDiJE
assetID: 9CD0AFF5-B050-4B97-8E65-185F969686D5
---

## Download

```shell
curl -XGET 'https://{{ page.spaceID }}:{{ page.apiToken }}@api.lingoapp.com/alpha/assets/{{ page.assetID }}/download?type=png'
```

`GET /assets/<asset_id>/download/`

Download the file for an asset or one of its available file cuts

_Note: The download endpoint is currently rate limited to 2000 every 5 minutes._

| Parameters                                   |                                                                        |
|----------------------------------------------|------------------------------------------------------------------------|
| assetId<span class="arg-type">integer</span> | The id of the asset.                                                   |
| type<span class="arg-type">string</span>     | The file format to download, or null for the original (default: null). |


## Available File Cuts

| Original | Cuts          |
|----------|---------------|
| SVG      | PNG, PDF, EPS |
| JPG      | PNG           |
| PNG      | JPG           |
| GIF      | JPG, PNG      |
| EPS      | PNG           |
| PDF      | PNG           |
| TIFF     | PNG, JPG      |
| Sketch   | SVG, PNG, PDF |

