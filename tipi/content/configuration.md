---
status: Draft
---
# Configuration

## Filename

By default config filename is `config.json` but can be configured in `index.html` with a `meta` tag:

    <meta name="config" content="my-config.json"/>
    
## Format

Here is the format of the config file with its default values. All the values are optional.

<!--
* app: App configuration
	* debug: (false) Enable debug mode
	* content_path: ("content/") Path to the content folder (relative to base path)
	* content_extension: (".md") The file extension to use for content files
	* themes_path: ("themes/") Path to the themes folder (relative to base path)
	* theme: ("tipi") The currently active theme name. Set to false to disable theming
* blog: Blog configuration
	* blog_folder: ("blog") The name of the folder where your posts are stored
	* per_page: (10) The amount of the posts displayed on a single page. 0 disables pagination
	* excerpt_words: (30) The length of excerpts in words
	* date_format: ("YYYY-MM-DD") Date format (https://momentjs.com/docs/#/displaying/)
	* time_format: ("HH:mm:ss") Time format
	* permalink: (":year/:month/:day/:title") The permalink format of articles
* site: Site configuration
	* title: The title of your website
	* subtitle: The subtitle of your website
	* description: The description of your website
	* author: Your name
	* language: (en) The language of your website. Use a 2-lettter ISO-639-1 code
	* timezone: The timezone of your website. Tipi uses the setting on your computer by default. You can find the list of available timezones [here](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). Some examples are America/New_York, Japan, and UTC.
* url: URL configuration
	* url: The URL of your website	
	* root: The root directory of your website (If your website is in a subdirectory, such as http://example.org/blog, set url to http://example.org/blog and set root to /blog/)
	* permalink_defaults: Default values of each segment in permalink	
* directory
	* source_dir: ("source") Source folder. Where your content is stored
	* public_dir: ("public") Public folder. Where the static site will be generated
	* tag_dir: ("tags") Tag directory
	* archive_dir: ("archives") Archive directory
	* category_dir: ("categories") Category directory
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
* Category & Tag:
	* default_category: (uncategorized) Default category
	* category_map: Category slugs	
	* tag_map: Tag slugs	
* Pagination
	* pagination_dir: ("page") Pagination directory
* Extensions
	* deploy: Deployment setting
* Include/Exclude Files or Folders
	* include: Hexo defaultly ignore hidden files and folders, but set this field will make Hexo process them
	* exclude: Hexo process will ignore files list under this field
	
```
{
  "global": {   // Global configuration
    "title": "Untitled",  // Site title
    "description": "",    // Site description
    "author": "",         // Site author
    "welcome": "Home",    // Welcome page. Set to false or empty value to use index.html as welcome page
    "theme": false,       // Theme name from themes folder. If false, index.html is used as theme template.
    "extension": "md",    // Default extension for content files
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
  "posts": {      // Posts list (blog). See pages/posts format below.
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
-->

### Pages/Posts format

There are four syntaxes available:

1. Array of pages/posts

      [{
        "title": "",  // Page/Post title
        "url": "",    // Content filename (with extension). If omitted, use title and default extension to build the filename. See Pages documentation.
        "tag": "",    // Page/Post tag(s)
        "img": "",    // Page/Post image relative to index.html. See "defaultImg" option to use content filename and custom extension for default images.
        "thumb": "",  // Page/Post thumbnail image. By default is the same as "img"
        "disqusEnable": false,  // Active Disqus page/post comments
        "disqusIdentifier": "", // Disqus identifier
        "disqusLang": "",       // Disqus language
        "date": "YYYY-MM-DD"    // Only blog posts. Post date              
      }, {
        ...
      }]
      
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

## Metas

Config properties could be overriden by `meta` tags. Only `global` configuration properties could be overriden. Add a `meta` tag which name is the property name and set the value in the content attribute.

For example, to set the theme (`global.theme` property):

    <meta name="theme" content="my-theme"/>