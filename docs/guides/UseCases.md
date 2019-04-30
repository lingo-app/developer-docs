---
title: Use Cases
summary: Some example use cases of the API (and what not to do)
permalink: /guides/use-cases/
order: 110
---

The Lingo API is currently intended for backend use on a server. This is in large part due to the nature of API keys at the moment. They grant access to all content in a space.

The following are some ideas on what could be done with the API. If you build something cool, let us know so we can share it here.


## Validate

Some design teams have strict requirements for their digital content. That could mean specific naming convention, file formats, or image sizes. With programatic access to your Lingo assets you can build your perfect validation workflow to make sure everything meets your criteria.


## Distribution

Assets in Lingo are often intended to be used in digital products such as an app or website. Currently, Lingo doesn't offer a built in way to do that.

With the API you can fetch assets from Lingo, download the desired file cuts and store them as needed. From there you can use them as desired be that your website, app builds, etc. You may even want to perform some validation along the way.

## Diffing

The API provides the data needed to find changes in your library. You could fetch all the assets in a kit, store the hashes then later fetch again and see what files have changed.




