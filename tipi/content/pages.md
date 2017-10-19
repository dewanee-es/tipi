# Pages

Each markdown document is a page.

## URLs

The URL format is
	
	http://site/page/subpage/subsubpage

For static sites (Javascript) all the URLs have a hash part with the page:

	http://site/#/page/subpage/subsubpage
	
		or
		
	http://site/index.html#/page/subpage/subsubpage
	
Page names could be uppercase (Wiki style) or lowercase (blog style). Really, page names are case insensitive. So, `/Page` and `/page` are the same page. A page can not contain spaces, use _ or - characters instead.

By default, URL is converted to lowercase and appended .md suffix to get the filename for the page:

	/Page/Subpage/Subsubpage -> /page/subpage/subsubpage.md
	
### Alias

To use page title as URL. In config.json:

	"pages": {
		"Title": "file.md"
	}
	
	or
	
	"pages": {
		"0": {
			"url": "file.md",
			"title": "Title"
		}
	}
	
	or
	
	"pages": {
		"Title": {
			"url": "file.md"
		}
	}
	
	then
	
	/Tile	->	file.md
	
Alias is the title replacing spaces with - character.

!!! An alias can not contain a dot character

### Resources

/page/image.jpg

	or
	
#/page/image.jpg

## Links

Use absolute or relative links to link to pages by title or file.

Absolute:
- /Page (absolute page)	-> page.md
- /page.md (absolute file)

Relative: -> current page: /TopPage1/Page1, current file: /toppage1/page1.md
- Page2 (relative page to current one in the same level) -> /TopPage1/Page2
- page2.md (relative file to current one) -> /toppage1/page2.md

- ./Subpage (relative subpage) -> /TopPage1/Page1/Subpage
- page1/subpage.md (relative file in subfolder) -> /toppage1/page1/subpage.md

- ../TopPage1 (parent page) -> /TopPage1
- ../toppage1.md (parent file) -> /toppage1.md

!!! Be careful with relative links:

/TopPage1/Page1 and /TopPage1/Page1/ seems to be the same page, but relative links change!

- Subpage (relative subpage) -> /TopPage1/Page1/Subpage

- ./Subpage (relative subpage) -> /TopPage1/Page1/Subpage

- ../Page2 (sibling page) -> /TopPage1/Page2

Recommendation: Always strip ending slash. Change /Page1/ to /Page1

### Anchors

Use anchors (#) to link to sections in the page

## Files

Filenames always in lowercase and .md extension.
No spaces allowed, use - or _ character.
Translate special characters (ex. ñ to n)

## Folders

Folder names always in lowercase.
No spaces allowed, use - or _ character.
Translate special characters (ex. ñ to n)

### Subpages

Pages and subpages could be organized in two ways:

1. Page file and folder with subpages

	content/
		|
		+--page1.md		-> /Page1
		|
		+--page1.jpg	-> /Page1.jpg
		|
		+--page1/
		 	|
			+--subpage1.md	-> /Page1/Subpage1
			|
			+--subpage1.jpg	-> /Page1/Subpage1.jpg
			|
			+--subpage2.md	-> /Page1/Subpage2
			
PRO: Easy URLs (URL is also file location)
CON: Page files (md and resources) in one level are all mixed together
			
2. Folder with page and subpages
			
	content/
		|
		+--page2/
		    |
			+--page2.md		-> /Page2/ (or /Page2/Page2). PHP: also /Page2 JS: not /Page2 (404 error)
			|
			+--page2.jpg	-> /Page2/Page2.jpg
			|
			+--subpage3.md	-> /Page2/Subpage3
			|
			+--subpage3.jpg	-> /Page2/Subpage3.jpg
			|
			+--subpage4
				|
				+--subpage4.md	-> /Page2/Subpage4/
				
PRO: Better separation, each folder contain all page files (and subpages)
CON: In JS, URLs for pages inside folders must end with / character

Recommendation: The last option is the best way to organize files on disk. Even it's a good idea to have always a folder for each page.
