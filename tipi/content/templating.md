# Templating

Template blocks:

* #header: page header
* #toc: table of contents
* #tocIcon: table of contents visibility toggle
* #slider: posts slider
* #slides: posts slider slides
* #breadcrumb: page breadcrumb
* #menu: menu
* #blog: blog
* #post: post contents
* #disqus_thread: Disqus comments thread
* #footer: page footer
* #pages: pages list
* #social: social icons
* #copyright: copyright notice
* #poweredBy: powered by message
* #error: error message

Template variables:

* base_url: index html url
* theme_url (without trailing slash)
* site_title: configContent.global.title
* site_description: configContent.global.description
* site_author: configContent.global.author
* site_logo: configContent.global.logo
* page: current page
  * title: page title
  * url: URL to page file contents
  * tag: page tags, comma separated
  * img: page image, empty if none
  * thumb: page thumb image, empty if none
  * date: post date, empty for unknown
  * home: true for home page (welcome page)
  * slug: page slug fragment
* date: current date
	* date: day of the month (from 1-31)
	* day: day of the week (from 0-6)
	* year: year
	* hours: hour (from 0-23)
	* milliseconds: milliseconds (from 0-999)
	* minutes: minutes (from 0-59)
	* month: month (from 0-11)
	* seconds: seconds (from 0-59)
