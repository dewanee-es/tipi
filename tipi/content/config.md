# Configuration

## Filename

By default config filename is `config.json` but can be configured in `index.html` with a `meta` tag:

    <meta name="config" content="my-config.json"/>
    
## Format

Here is the format of the config file with its default values. All the values are optional.

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
	"breadcrumbHome": "#"		// Override URL for breadcrumb home link. Set to false to hide home link.
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