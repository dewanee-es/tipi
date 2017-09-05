Themes
======

Choosing a theme:

	content.json:
		"global": {
			"theme": "theme-folder-name"
		}
		
Aditional configuration (only for some themes!):

	content.json:
		"theme": {
			"template": "html-file-name-without-extension",	// "index" by default, ex: "vertical" for use "vertical.html" as theme template
			"style": "style-name"	// empty by default, some themes can use this style, for example bootstrap theme with bootswatch layout to select bootswatch theme
		}
		
Themes templates
----------------

A template is a .html file in theme folder. The template can use some variables and has "blocks" where contents will be inserted identified by their css selector.

Variables:
	{{ base_url }}			- URL of the homepage
	{{ theme_url }} 		- URL of the selected theme folder
	{{ theme_style }}		- Theme style name as is defined in content.json
	{{ site_title }}		- Title of the web as is defined in content.json
	{{ site_description }}	- Description of the web as is defined in content.json
	{{ site_author }}		- Author of the web as is defined in content.json
	
Page blocks (css selector): All the blocks are optional in the theme
	title			- Page title | Site title
	#header			- Header of the site
	#menu			- Site menu (inside must exists an unordered list where menu items will be added: #menu > ul)
						The active menu item will have the active class
	#slider			- Slider (not supported yet)
	#slides			- Slides in the slider (not supported yet)
	#blog			- List of recent pages with excerpt (not supported yet)
	#content		- Page content
	h1				- Page title
	#tocIcon		- Icon to show/hide the table of contents
	#toc			- Table of contents of the page (must have an unordered list: #toc > ul)
						The ids #tocMain and #tocN (N = number) are reserved for toc header elements
						Each element of the list (li) has a class for the header level: .toc-h1 ... .toc-h6
	#disqus_thread	- Disqus thread
	#footer			- Site footer
	#pages			- List of pages
	#social			- List of social contacts
	#copyright		- Copyright info
	#poweredby		- Application powered by message
	#error			- Error message
	
Body classes: When a page loads some classes will be added to body
	post-template	- All pages
	home-template	- Welcome page
	page-template	- Not welcome page