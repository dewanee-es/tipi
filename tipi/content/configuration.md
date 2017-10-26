<!--
* app: App configuration
	* debug: (false) Enable debug mode
	* content_path: ("content/") Path to the content folder (relative to base path)
	* themes_path: ("themes/") Path to the themes folder (relative to base path)
* blog: Blog configuration
	* blog_folder: ("blog") The name of the folder where your posts are stored
	* per_page: (10) The amount of the posts displayed on a single page. 0 disables pagination
	* excerpt_words: (30) The length of excerpts in words
	* date_format: ("YYYY-MM-DD") Date format (https://momentjs.com/docs/#/displaying/)
	* time_format: ("HH:mm:ss") Time format
	* permalink: (":year/:month/:day/:title") The permalink format of articles
* url: URL configuration
	* url: The URL of your website	
	* root: The root directory of your website (If your website is in a subdirectory, such as http://example.org/blog, set url to http://example.org/blog and set root to /blog/)
	* permalink_defaults: Default values of each segment in permalink	
* directory
	* source_dir: ("source") Source folder. Where your content is stored
	* public_dir: ("public") Public folder. Where the static site will be generated
	* code_dir: ("downloads/code") Include code directory (subdirectory of source_dir)
	* i18n_dir: (":lang") i18n directory
	* skip_render:  Paths not to be rendered. You can use glob expressions for path matching	
* writing
	* new_post_name: (":title.md") The filename format for new posts
	* default_layout: ("post") Default layout
	* titlecase: (false) Transform titles into title case?
	* external_link: (true) Open external links in new tab?
	* filename_case: (0) Transform filenames to 1 lower case; 2 upper case
	* render_drafts: (false) Display drafts?
	* post_asset_folder: (false) Enable the Asset Folder?
	* relative_link: (false) Make links relative to the root folder?
	* future: (true) Display future posts?
	* highlight:  Code block settings	
* Pagination
	* pagination_dir: ("page") Pagination directory
* Extensions
	* deploy: Deployment setting
* Include/Exclude Files or Folders
	* include: Hexo defaultly ignore hidden files and folders, but set this field will make Hexo process them
	* exclude: Hexo process will ignore files list under this field
slugify_mode (encode): Specifies how terms (titles, tags, categories, etc.) will be “slugified”, i.e. turned into URL parts and filenames. The acceptable values detailed below, and can be combined by separating them with a comma (like, say, transliterate,lowercase):
* encode (only URL): The term will be kept as-is, but non-ASCII characters (like accented characters and non-latin letters) will be percent-encoded. Modern browsers will usually show the decoded version however so it will look natural in the address bar. (file: Vídeos.md)
* encode_plus (only URL): Like encode but spaces are replaced by +
* transliterate: The term will be converted to ASCII, which means any accented or non-latin character will be tentatively replaced with an unaccented latin character. (file: Videos.md)
* lowercase: Convert the term to lower-case. (file: vídeos.md)
* dot_to_dash: Convert dots (and punctuation symbols) to dashes. 
* space_to_dash: Convert spaces to dashes
* dot_to_underscore: Convert dots (and punctuation symbols) to underscore.
* space_to_underscore: Convert spaces to underscore
* allowed (for filename): (If no dot_to_dash or dot_to_underscore is used) Remove reserved characters: /\?%*:|"<>
slugify_mode for files: 1. encode|transliterate 2. titlecase|lowercase 3. dot|(dash|underscore) 4. space|(dash|underscore) => default: encode,lowercase,dot,space_to_dash => lowercase,space_to_dash,allowed. Ejemplo: Vídeos: Terror => vídeos-terror.md
slugify_mode for files: ¿cual es el origen? ¿a partir del título o a partir de slug? a partir de título está bien porque permite cosas como: John Doe como archivo y john-doe como slug, pero a partir del slug es dificil determinar el nombre del archivo. a partir del slug se puede determinar el nombre del archivo de forma fácil <-- opción recomendada. En ese caso: slugify_mode for files: lowercase,allowed
slugify_mode for url: space_to_dash,encode. Ejemplo: Vídeos: Terror => V%C3%ADdeos%3A-Terror
slugify: https://codenhagen.wordpress.com/2015/08/26/javascript-slugify-function/	https://gist.github.com/bentruyman/1211400	https://github.com/pid/speakingurl/blob/master/lib/speakingurl.js
	
```
    "logo": "",           // Image logo
    "appDir": ".",        // Root Tipi directory with assets, themes, etc. Relative to index.html
    "contentDir": "content/",   // Content files directory relative to index.html
	"defaultImg": false,		// By default, pages/posts images are empty.
								// Set to true to use image with same content filename and .jpg extension.
								// Set to string to use image with same content filename and custom extension (without dot), e.g. "png"
	"thumb": "img/thumb.jpg",	// Thumb image for pages/posts without image. Relative to index.html
	"breadcrumbHome": "#/"		// Override URL for breadcrumb home link. Set to false to hide home link.
  },
  "metadata": {   // Content files metadata configuration
    "begin": "---",       // Metadata block prefix
    "end": "---"          // Metadata block suffix. For example, change to "..." to be compatible with YAML syntax 
  },
  "footer": {     // Footer configuration
    "copyright": "",      // Copyright notice
    "poweredBy": "Powered by <a href='http://github.com/dewanee-es/tipi'>Tipi</a>"  // Powered by notice
  },
  "social": [     // Social links. See format below
  ],
  "pages": {      // Pages list. See pages/posts format below.
  },
  "theme": {      // Theme configuration. Some themes use their own properties.
    "template": "index.html", // Theme template filename
    "style": "",              // Theme style. For themes with different styles. For example, in bootstrap theme is the bootswatch style name.
    "iconClass": "fa fa-"    // CSS class prefix for icons. Default value works with Font Awesome icons.
  },
  "addons": {     // Addons configuration. Set addon to true to activate
    "fontAwesome": false,     // Font Awesome icons
	"highlight": false,       // Highlight.JS. Set to stylesheet name, for example "default". Set to true for custom stylesheet.
    "pace": false,            // Pace loader
  }
}
```

      
2. Map of pages/posts. Title is used as key in the map:

      {
        "Title1": {
          "url": "",
          ...
        },
        "Title2": { ... }
        ...
      }
      
3. Alias for pages/posts. Only title and url are specified. Rest properties get default values:

      {
        "Title1": "file1.md",
        "Title2": "file2.md",
        ...
      }
      
4. List of pages/posts. Content filename is build automatically.

      [
        "Title1",
        "Title2",
        ...
      ]
      
### Social links format

Use "icon" or "img" to specify social link image:

    [{
      "icon": "",	// Icon filename without extension. For example: "Github-color" for "img/social/Github-color.svg" image.
	  "img": "",  	// Custom icon image. For example: "http://myserver.com/myicon.png"
      "url: ""    	// Link target. For example: "http://www.github.com"
    }, {
      ...
    }] 
-->

# Configuration

## Filename

By default config filename is `config.json` but can be configured in `index.html` with a `meta` tag:

    <meta name="config" content="my-config.json"/>
    
## Format

Here is the format of the config file with its default values. JSON & PHP config file follow this format. All values are optional.

```
site:				# --- Site configuration ---
  title: Untitled					# The title of your website
  subtitle: 						# The subtitle of your website
  description: 						# The description of your website
  author:							# Your name
  language: en						# The language of your website. Use a 2-lettter ISO-639-1 code
  timezone": 						# The timezone of your website. Tipi uses the setting on your computer by default.
									# You can find the list of available timezones [here](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
									# Some examples are America/New_York, Japan, and UTC.
  theme: tipi						# The currently active theme name. Set to false or empty value to disable theming.
  welcome: Home   					# Welcome page. Set to false or empty value to use index.html as welcome page.
  content_extension: md				# The file extension to use for content files
  
blog:				# --- Blog configuration ---
  default_category: uncategorized	# Default category
  category_url: categories			# Category URL fragment
  tag_url: tags						# Tag URL fragment
  archive_url: archives				# Archive URL fragment
	
pages:				# --- Pages list --- (Only JS. See pages/posts format below)
posts:      		# --- Posts list (blog) --- (Only JS. See pages/posts format below)
```

### Pages/Posts format

There are four formats available:

1. List of pages/posts:

```
  - title:					# Page/Post title
    url:					# Content filename (with extension). If omitted, use title and default extension to build the filename.
							# See Pages documentation.
    img: 					# Page/Post image relative to index.html.
							# See "defaultImg" option to use content filename and custom extension for default images.
    thumb:					# Page/Post thumbnail image. By default is the same as "img"
    disqusEnable: false		# Active Disqus page/post comments
    disqusIdentifier:		# Disqus identifier
    disqusLang:				# Disqus language
	
		# Only blog posts
	category:				# Post category(ies)
    tag: 					# Post tag(s)
    date:					# Post date: YYYY-MM-DD
```

## Metas

Config properties could be overriden by `meta` tags. Only `site` configuration properties could be overriden. Add a `meta` tag which name is the property name and set the value in the content attribute.

For example, to set the theme (`site.theme` property):

    <meta name="theme" content="my-theme"/>