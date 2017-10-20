# Metadata

The metadata must be the first block in the file and must take the form of valid YAML set between triple-dashed lines. Here is a basic example:

```
---
layout: post
title: Blogging Like a Hacker
---
```

Between these triple-dashed lines, you can set predefined variables (see below for a reference) or even create custom ones of your own. These variables will then be available to you to access using template tags both further down in the file and also in any layouts or includes that the page or post in question relies on.

## Predefined Global Variables

There are a number of predefined global variables that you can set in the metadata of a page or post. All variables are optional.

* layout: If set, this specifies the layout file to use. Use the layout file name without the file extension. 
* permalink: If you need your processed blog post URLs to be something other than the site-wide style (default /year/month/day/title.html), then you can set this variable and it will be used as the final URL.
* published: Set to false if you don’t want a specific post to show up when the site is generated.
* title: Page title

**Variables for posts only:**

* categories: Instead of placing posts inside of folders, you can specify one or more categories that the post belongs to. Categories can be specified as a YAML list or a comma-separated string.
* category: Only one category string.
* comments: Enables comment feature for the post. Default: true.
* date: Published date. Default: date from filename or file created date. A date here overrides the default value. This can be used to ensure correct sorting of posts. A date is specified in the format `YYYY-MM-DD HH:MM:SS +/-TTTT`; hours, minutes, seconds, and timezone offset are optional.
* tags: Similar to categories, one or multiple tags can be added to a post. Also like categories, tags can be specified as a YAML list or a comma-separated string.
* updated: Updated date. Default: date from filename or file updated date. Similar format to `date` variable.

## Custom Variables

Any variables in the front matter that are not predefined are mixed into the data that is sent to the Liquid templating engine during the conversion. For instance, if you set a title, you can use that in your layout to set the page title:

```
<!DOCTYPE HTML>
<html>
  <head>
    <title>{{ page.title }}</title>
  </head>
  <body>
    …
```