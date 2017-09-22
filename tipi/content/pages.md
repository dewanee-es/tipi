# Pages

- wikilinks [[Pagina]] [[./archivo.jpg]] [[/subpagina]]
- links [texto](#/Pagina)
- Translate [texto](archivo.md) -> #/Pagina
- Directo #/Archivo -> archivo.md
- Nombre archivo/carpeta con primera en mayúsculas
- Carpeta por página con todo su contenido (carpeta pagina con pagina.md, pagina.jpg, thumb.jpg, ...)
- Solo un nivel de carpetas/páginas
- Carpetas/Páginas con subcarpetas/subpáginas
- Solo un nivel de páginas, varios de carpetas, asociación mediante archivo json
- carpetas archivos con espacios
- carpetas archivos sin espacios: -
- carpetas archivos con caracteres especiales: ñ
- carpetas archivos sin caracteres especiales:
- página con subpáginas: archivo dentro de carpeta y mismo nombre
- página con subpáginas: archivo dentro de carpeta con nombre index.md
- #
- #!
- #/
- blog format: AAAA/MM/DD
- Páginas en mayúsculas
- Páginas en minúsculas

Each markdown document is a page.

## URLs

The URL format is
	
	http://site/page/subpage/subsubpage

For static sites (Javascript) all the URLs have a hash part with the page:

	http://site/#/page/subpage/subsubpage
	
		or
		
	http://site/index.html#/page/subpage/subsubpage
	
Page names could be uppercase (Wiki style) or lowercase (blog style). Really, page names is case insensitive. So, `/Page` and `/page` are the same page.
	
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

- ../TopPage1 (parent page) -> /TopPage1)
- ../toppage1.md (parent file) -> /toppage1.md

### Anchors

Use anchors (#) to link to sections in the page

## Files

Filenames always in lowercase and .md extension.
No spaces allowed, use - or _ character.

## Folders

Folder names always in lowercase.
No spaces allowed, use - or _ character.

### Subpages

	content/
		|
		+--page1.md		-> /Page1
		|
		+--page1/
		|	|
		|	+--subpage1.md	-> /Page1/Subpage1
		|	|
		|	+--subpage2.md	-> /Page1/Subpage2
		|
		+--page2.md		-> /Page2
