# Templating

Template variables:

* base_url: index html url
* theme_url (without trailing slash)
* site_title: configContent.global.title
* site_description: configContent.global.description
* site_author: configContent.global.author
* site_logo: configContent.global.logo
* page: current page
  * title
  * ...
* date: current date
	* date: day of the month (from 1-31)
	* day: day of the week (from 0-6)
	* year: year
	* hours: hour (from 0-23)
	* milliseconds: milliseconds (from 0-999)
	* minutes: minutes (from 0-59)
	* month: month (from 0-11)
	* seconds: seconds (from 0-59)
