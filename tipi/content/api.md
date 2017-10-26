# API

API for developers.

*   [1\. Objects](#objects)
*   [1.1\. Tipi page](#tipi-page)
*   [1.2\. Tipi page collection](#tipi-page-collection)
*   [1.3\. Tipi pages](#tipi-pages)
*   [1.4\. Tipi files](#tipi-files)
*   [1.5\. Tipi plugins](#tipi-plugins)
*   [1.6\. Tipi themes](#tipi-themes)
*   [1.7\. Tipi config](#tipi-config)
*   [1.8\. Tipi text](#tipi-text)
*   [1.9\. Tipi toolbox](#tipi-toolbox)
*   [2\. Events](#events)
*   [3\. Formats](#formats)
*   [4\. Debugging](#debugging)
*   [5\. Tips and tricks](#tips-and-tricks)

## Objects

The following objects are available in Tipi:

[$tipi->page](#tipi-page) gives access to current page  
[$tipi->pages](#tipi-pages) gives access to pages from file system  
[$tipi->files](#tipi-files) gives access to files from file system  
[$tipi->plugins](#tipi-plugins) gives access to plugins  
[$tipi->themes](#tipi-themes) gives access to themes  
[$tipi->config](#tipi-config) gives access to configuration  
[$tipi->text](#tipi-text) gives access to text  
[$tipi->toolbox](#tipi-toolbox) gives access to toolbox with helpers

### Tipi page

Tipi page gives access to current page:

**$tipi->page->get($key)**  
Return page [meta data](metadata.md)

**$tipi->page->getHtml($key)**  
Return page [meta data](metadata.md), HTML encoded

**$tipi->page->getDate($key, $format = "")**  
Return page [meta data](metadata.md) as [language specific date](#formats)

**$tipi->page->getDateHtml($key, $format = "")**  
Return page [meta data](metadata.md) as [language specific date](#formats), HTML encoded

**$tipi->page->getDateFormatted($key, $format)**  
Return page [meta data](metadata.md) as [custom date](http://php.net/manual/en/function.date.php)

**$tipi->page->getDateFormattedHtml($key, $format)**  
Return page [meta data](metadata.md) as [custom date](http://php.net/manual/en/function.date.php), HTML encoded

**$tipi->page->getContent($rawFormat = false, $sizeMax = 0)**  
Return page content, HTML encoded or raw format

**$tipi->page->getParent()**  
Return parent page of current page, null if none

**$tipi->page->getParentTop($homeFailback = true)**  
Return top-level page for current page, null if none

**$tipi->page->getSiblings($showInvisible = false)**  
Return [page collection](#tipi-page-collection) with pages on the same level as current page

**$tipi->page->getChildren($showInvisible = false)**  
Return [page collection](#tipi-page-collection) with child pages of current page

**$tipi->page->getPages()**  
Return [page collection](#tipi-page-collection) with additional pages for current page

**$tipi->page->getPage($key)**  
Return related page

**$tipi->page->getBase($multiLanguage = false)**  
Return page base

**$tipi->page->getLocation($absoluteLocation = false)**  
Return page location

**$tipi->page->getUrl()**  
Return page URL

**$tipi->page->getExtra($name)**  
Return page extra HTML data

**$tipi->page->getHeader($key)**  
Return page response header

**$tipi->page->getModified($httpFormat = false)**  
Return page modification date, Unix time or HTTP format

**$tipi->page->getLastModified($httpFormat = false)**  
Return last modification date, Unix time or HTTP format

**$tipi->page->getStatusCode($httpFormat = false)**  
Return page status code, number or HTTP format

**$tipi->page->error($statusCode, $pageError = "")**  
Respond with error page

**$tipi->page->clean($statusCode, location = "")**  
Respond with status code, no page content

**$tipi->page->isAvailable()**  
Check if page is available

**$tipi->page->isVisible()**  
Check if page is visible

**$tipi->page->isActive()**  
Check if page is within current request

**$tipi->page->isCacheable()**  
Check if page is cacheable

**$tipi->page->isError()**  
Check if page with error

**$tipi->page->isHeader($key)**  
Check if response header exists

**$tipi->page->isExisting($key)**  
Check if page [meta data](metadata.md) exists

**$tipi->page->isPage($key)**  
Check if related page exists

Here's an example snippet for showing page content:

```
    <div class="content">
    <div class="main">
    <h1><?php echo $tipi->page->getHtml("titleContent") ?></h1>
    <?php echo $tipi->page->getContent() ?>
    </div>
    </div>
```

Here's an example snippet for showing page content with additional meta data:

```
    <div class="content">
    <div class="main">
    <h1><?php echo $tipi->page->getHtml("titleContent") ?></h1>
    <?php echo $tipi->page->getContent() ?>
    <p><?php echo $tipi->page->getHtml("author") ?></p>
    </div>
    </div>
```

Here's an example snippet for showing page content with additional tags:

```
    <div class="content">
    <div class="main">
    <h1><?php echo $tipi->page->getHtml("titleContent") ?></h1>
    <?php echo $tipi->page->getContent() ?>
    <?php if($tipi->page->isExisting("tag")): ?>
    <p>
    <?php foreach(preg_split("/\s*,\s*/", $tipi->page->get("tag")) as $tag): ?>
    <?php if(++$tagCounter>1) echo ", "; echo htmlspecialchars($tag) ?>
    <?php endforeach ?>
    </p>
    <?php endif ?>
    </div>
    </div>
```

### Tipi page collection

Tipi page collection gives access to these functions:

**$pages->filter($key, $value, $exactMatch = true)**  
Filter page collection by meta data

**$pages->match($regex = "/.*/")**  
Filter page collection by file name

**$pages->sort($key, $ascendingOrder = true)**  
Sort page collection by meta data

**$pages->similar($page, $ascendingOrder = false)**  
Sort page collection by meta data similarity

**$pages->merge($input)**  
Merge page collection

**$pages->append($page)**  
Append to end of page collection

**$pages->prepend($page)**  
Prepend to start of page collection

**$pages->limit($pagesMax)**  
Limit the number of pages in page collection

**$pages->reverse()**  
Reverse page collection

**$pages->shuffle()**  
Randomize page collection

**$pages->pagination($limit, $reverse = true)**  
Paginate page collection

**$pages->getPaginationNumber()**  
Return current page number in pagination

**$pages->getPaginationCount()**  
Return highest page number in pagination

**$pages->getPaginationLocation($absoluteLocation = true, $pageNumber = 1)**  
Return location for a page in pagination

**$pages->getPaginationPrevious($absoluteLocation = true)**  
Return location for previous page in pagination

**$pages->getPaginationNext($absoluteLocation = true)**  
Return location for next page in pagination

**$pages->getPagePrevious($page)**  
Return previous page in collection, null if none

**$pages->getPageNext($page)**  
Return next page in collection, null if none

**$pages->getFilter()**  
Return current page filter

**$pages->getModified($httpFormat = false)**  
Return page collection modification date, Unix time or HTTP format

**$pages->isPagination()**  
Check if there is a pagination

Here's an example snippet for showing three random pages:

```
    <?php $pages = $tipi->pages->index() ?>
    <ul>
    <?php foreach($pages->shuffle()->limit(3) as $page): ?>
    <li><?php echo $page->getHtml("title") ?></li>
    <?php endforeach ?>
    </ul>
```

Here's an example snippet for showing latest pages:

```
    <?php $pages = $tipi->pages->index() ?>
    <ul>
    <?php foreach($pages->sort("modified", false) as $page): ?>
    <li><?php echo $page->getHtml("title") ?></li>
    <?php endforeach ?>
    </ul>
```

Here's an example snippet for showing all pages with draft status:

```
    <?php $pages = $tipi->pages->index(true, true) ?>
    <ul>
    <?php foreach($pages->filter("status", "draft") as $page): ?>
    <li><?php echo $page->getHtml("title") ?></li>
    <?php endforeach ?>
    </ul>
```

### Tipi pages

Tipi pages gives access to pages from file system:

**$tipi->pages->find($location, $absoluteLocation = false)**  
Return [page](#tipi-page) from file system, null if not found

**$tipi->pages->index($showInvisible = false, $multiLanguage = false, $levelMax = 0)**  
Return [page collection](#tipi-page-collection) with all pages

**$tipi->pages->top($showInvisible = false)**  
Return [page collection](#tipi-page-collection) with top-level navigation

**$tipi->pages->path($location, $absoluteLocation = false)**  
Return [page collection](#tipi-page-collection) with path ancestry

**$tipi->pages->multi($location, $absoluteLocation = false, $showInvisible = false)**  
Return [page collection](#tipi-page-collection) with multiple languages

**$tipi->pages->clean()**  
Return [page collection](#tipi-page-collection) that is empty

Here's an example snippet for showing all pages:

```
    <?php $pages = $tipi->pages->index(true, true) ?>
    <?php $tipi->page->setLastModified($pages->getModified()) ?>
    <ul>
    <?php foreach($pages as $page): ?>
    <li><?php echo $page->getHtml("title") ?></li>
    <?php endforeach ?>
    </ul>
```

Here's an example snippet for showing pages below a specific location:

```
    <?php $pages = $tipi->pages->find("/help/")->getChildren(true) ?>
    <?php $tipi->page->setLastModified($pages->getModified()) ?>
    <ul>
    <?php foreach($pages as $page): ?>
    <li><?php echo $page->getHtml("title") ?></li>
    <?php endforeach ?>
    </ul>
```

Here's an example snippet for showing top-level navigation pages:

```
    <?php $pages = $tipi->pages->top() ?>
    <?php $tipi->page->setLastModified($pages->getModified()) ?>
    <ul>
    <?php foreach($pages as $page): ?>
    <li><?php echo $page->getHtml("titleNavigation") ?></li>
    <?php endforeach ?>
    </ul>
```

### Tipi files

Tipi files gives access to files from file system:

**$tipi->files->find($location, $absoluteLocation = false)**  
Return [page](#tipi-page) with media file information, null if not found

**$tipi->files->index($showInvisible = false, $multiPass = false, $levelMax = 0)**  
Return [page collection](#tipi-page-collection) with all media files

**$tipi->files->clean()**  
Return [page collection](#tipi-page-collection) that is empty

Here's an example snippet for showing all media files:

```
    <?php $files = $tipi->files->index(true) ?>
    <?php $tipi->page->setLastModified($files->getModified()) ?>
    <ul>
    <?php foreach($files as $file): ?>
    <li><?php echo $file->getLocation(true) ?></li>
    <?php endforeach ?>
    </ul>
```

Here's an example snippet for showing latest media files:

```
    <?php $files = $tipi->files->index(true)->sort("modified", false) ?>
    <?php $tipi->page->setLastModified($files->getModified()) ?>
    <ul>
    <?php foreach($files as $file): ?>
    <li><?php echo $file->getLocation(true) ?></li>
    <?php endforeach ?>
    </ul>
```

Here's an example snippet for showing media files of a specific type:

```
    <?php $files = $tipi->files->index(true)->filter("type", "pdf") ?>
    <?php $tipi->page->setLastModified($files->getModified()) ?>
    <ul>
    <?php foreach($files as $file): ?>
    <li><?php echo $file->getLocation(true) ?></li>
    <?php endforeach ?>
    </ul>
```

### Tipi plugins

Tipi plugins gives access to [plugins](/plugins/):

**$tipi->plugins->get($name)**  
Return plugin

**$tipi->plugins->getData()**  
Return plugin version

**$tipi->plugins->getModified($httpFormat = false)**  
Return plugin modification date, Unix time or HTTP format

**$tipi->plugins->register($name, $plugin, $version, $priority = 0)**  
Register plugin

**$tipi->plugins->isExisting($name)**  
Check if plugin exists

Here's an example snippet for showing information about plugins:

```
    <ul>
    <?php foreach($tipi->plugins->getData() as $key=>$value): ?>
    <li><?php echo htmlspecialchars("$key $value") ?></li>
    <?php endforeach ?>
    </ul>
```

Here's an example snippet for checking if plugin exists:

```
    <?php if($tipi->plugins->isExisting("fontawesome")): ?>
    <a href="https://twitter.com/username"><i class="fa fa-twitter"></i></a>
    <?php else: ?>
    <?php $tipi->page->error(500, "Snippet requires 'fontawesome' plugin!") ?>
    <?php endif ?>
```

Here's an example for registering a plugin, see also [more example plugins](#tipi-example-plugins):

```
    <?php
    class TipiExample
    {
        const VERSION = "0.1.0";
    }
    $tipi->plugins->register("example", "TipiExample", TipiExample::VERSION);
    ?>
```

### Tipi themes

Tipi themes gives access to [themes](themes.md):

**$tipi->themes->get($name)**  
Return theme

**$tipi->themes->getData()**  
Return theme version

**$tipi->themes->getModified($httpFormat = false)**  
Return theme modification date, Unix time or HTTP format

**$tipi->themes->register($name, $theme, $version, $priority = 0)**  
Register theme

**$tipi->themes->isExisting($name)**  
Check if theme exists

Here's an example snippet for showing information about themes:

```
    <ul>
    <?php foreach($tipi->themes->getData() as $key=>$value): ?>
    <li><?php echo htmlspecialchars("$key $value") ?></li>
    <?php endforeach ?>
    </ul>
```

Here's an example snippet for checking if theme exists:

```
    <?php if($tipi->themes->isExisting("flatsite")): ?>
    <p>Flatsite theme installed.</p>
    <?php else: ?>
    <?php $tipi->page->error(500, "Snippet requires 'flatsite' theme!") ?>
    <?php endif ?>
```

Here's an example for registering a theme:

```
    class TipiThemeExample
    {
        const VERSION = "0.1.0";    
    }
    $tipi->themes->register("example", "TipiThemeExample", TipiThemeExample::VERSION);
    ?>
```

### Tipi config

Tipi config gives access to [configuration](configuration.md):

**$tipi->config->get($key)**  
Return configuration

**$tipi->config->getHtml($key)**  
Return configuration, HTML encoded

**$tipi->config->getData($filterStart = "", $filterEnd = "")**  
Return configuration strings

**$tipi->config->getModified($httpFormat = false)**  
Return configuration modification date, Unix time or HTTP format

**$tipi->config->isExisting($key)**  
Check if configuration exists

Here's an example snippet for showing static website settings:

```
    <div class="config">
    <?php foreach($tipi->config->getData("static") as $key=>$value): ?>
    <?php echo htmlspecialchars("$key: $value") ?><br />
    <?php endforeach ?>
    </div>
```

Here's an example snippet for showing webmaster settings:

```
    <div class="config">
    <?php $author = $tipi->config->get("author") ?>
    <?php $email = $tipi->config->get("email") ?>
    <?php echo htmlspecialchars("$author - $email") ?>
    </div>
```

Here's an example snippet for checking safe mode:

```
    <div class="config">
    <?php $parserSafeMode = $tipi->config->get("parserSafeMode") ?>
    Safe mode is <?php echo htmlspecialchars($parserSafeMode ? "on" : "off") ?>.
    </div>
```

### Tipi text

Tipi text gives access to [text](language.md):

**$tipi->text->get($key)**  
Return text string

**$tipi->text->getHtml($key)**  
Return text string, HTML encoded

**$tipi->text->getText($key, $language )**  
Return text string for specific language

**$tipi->text->getTextHtml($key, $language )**  
Return text string for specific language, HTML encoded

**$tipi->text->getData($filterStart = "", $language = "")**  
Return text strings

**$tipi->text->getLanguages()**  
Return languages

**$tipi->text->getModified($httpFormat = false)**  
Return text modification date, Unix time or HTTP format

**$tipi->text->isLanguage($language)**  
Check if language exists

**$tipi->text->isExisting($key, $language = "")**  
Check if text string exists

Here's an example snippet for showing contact text strings:

```
    <div class="text">
    <?php foreach($tipi->text->getData("contact") as $key=>$value): ?>
    <?php echo htmlspecialchars("$key: $value") ?><br />
    <?php endforeach ?>
    </div>
```

Here's an example snippet for checking if language exists:

```
    <div class="text">
    <?php $swedish = $tipi->text->isLanguage("sv") ?>
    Swedish language <?php echo htmlspecialchars($swedish ? "" : "not") ?> found.
    </div>
```

Here's an example snippet for showing languages and translators:

```
    <div class="text">
    <?php foreach($tipi->text->getLanguages() as $language): ?>
    <?php echo $tipi->text->getTextHtml("languageDescription", $language) ?> - 
    <?php echo $tipi->text->getTextHtml("languageTranslator", $language) ?><br />
    <?php endforeach ?>
    </div>
```

### Tipi toolbox

Tipi toolbox gives access to toolbox with helpers:

**$tipi->toolbox->getLocation($filterStrict = true)**  
Return location from current HTTP request

**$tipi->toolbox->getLocationArgs()**  
Return location arguments from current HTTP request

**$tipi->toolbox->isLocationArgs($location = "")**  
Check if there are location arguments in current HTTP request

**$tipi->toolbox->normaliseArgs($text, $appendSlash = true, $filterStrict = true)**  
Normalise location arguments

**$tipi->toolbox->getDirectoryEntries($path, $regex = "/.*/", $sort = true, $directories = true, $includePath = true)**  
Return files and directories

**$tipi->toolbox->readFile($fileName, $sizeMax = 0)**  
Read file, empty string if not found

**$tipi->toolbox->createFile($fileName, $fileData, $mkdir = false)**  
Create file

**$tipi->toolbox->copyFile($fileNameSource, $fileNameDestination, $mkdir = false)**  
Copy file

**$tipi->toolbox->renameFile($fileNameSource, $fileNameDestination, $mkdir = false)**  
Rename file

**$tipi->toolbox->mergeFile($fileNameSource, $fileNameDestination)**  
Merge file

**$tipi->toolbox->deleteFile($fileName, $pathTrash = "")**  
Delete file

**$tipi->toolbox->deleteDirectory($path, $pathTrash = "")**  
Delete directory

**$tipi->toolbox->modifyFile($fileName, $modified)**  
Set file modification date, Unix time

**$tipi->toolbox->getFileModified($fileName)**  
Return file modification date, Unix time

**$tipi->toolbox->getTextLines($text)**  
Return lines from text string, including newline

**$tipi->toolbox->getTextArgs($text, $optional = "-")**  
Return arguments from text string, space separated

Here's an example snippet for showing location and arguments of HTTP request:

```
    <div class="toolbox">
    <?php echo htmlspecialchars($tipi->toolbox->getLocation()) ?><br />
    <?php foreach($_REQUEST as $key=>$value): ?>
    <?php echo htmlspecialchars("$key: $value") ?><br />
    <?php endforeach ?>
    </div>
```

Here's an example snippet for showing files in a directory:

```
    <div class="toolbox">
    <?php $path = $tipi->config->get("configDir") ?>
    <?php foreach($tipi->toolbox->getDirectoryEntries($path, "/.*/", true, false) as $entry): ?>
    <?php echo htmlspecialchars($entry) ?><br />
    <?php endforeach ?>
    </div>
```

Here's an example snippet for reading text lines from file:

```
    <div class="toolbox">
    <?php $fileName = $tipi->config->get("configDir").$tipi->config->get("robotsFile") ?>
    <?php $fileData = $this->tipi->toolbox->readFile($fileName) ?>
    <?php foreach($this->tipi->toolbox->getTextLines($fileData) as $line): ?>
    <?php echo htmlspecialchars($line) ?><br />
    <?php endforeach ?>
    </div>
```

## Events

The following events are available:

**function onLoad($tipi)**  
Handle initialisation

**function onStartup($update)**  
Handle startup

**function onRequest($scheme, $address, $base, $location, $fileName)**  
Handle request

**function onParseMeta($page)**  
Handle page meta data parsing

**function onParseContentRaw($page, $text)**  
Handle page content parsing of raw format

**function onParseContentBlock($page, $name, $text, $shortcut)**  
Handle page content parsing of custom block

**function onParseContentText($page, $text)**  
Handle page content parsing

**function onParsePage()**  
Handle page parsing

**function onExtra($name)**  
Handle page extra HTML data

**function onEditUserRestrictions($email, $location, $fileName, $users)**  
Handle user restrictions

**function onEditUserAccount($email, $password, $action, $users)**  
Handle user account changes

**function onEditContentFile($page, $action)**  
Handle content file editing

**function onCommand($args)**  
Handle command

**function onCommandHelp()**  
Handle command help

**function onShutdown()**  
Handle shutdown

Here's the normal sequence of events:

    onLoad -----> onStartup -----> onRequest
                      |                |
                      |                |---------------------
                      |                |                    |
                      ▼                ▼                    ▼
                  onCommand        onParseMeta          onEditUserRestrictions
                  onCommandHelp    onParseContentRaw    onEditUserAccount
                      |            onParseContentBlock  onEditContentFile
                      |            onParseContentText       |
                      |            onParsePage              |
                      |            onExtra                  |
                      ▼                |                    |
    exit <------- onShutDown <-------------------------------

When a page is displayed, the plugins are loaded and `onLoad` will be called. As soon as all plugins are loaded `onStartup` will be called. After that the core informs with `onRequest` that there's a request. Then pages can be analysed with various `onParse`-events. If an error occurs, an error page will be generated. Finally the page is output and `onShutdown` will be called.

Here's an example plugin for generating HTML with an `[example]` shortcut:

```
    <?php
    class TipiExample
    {
        const VERSION = "0.1.1";
        var $tipi;

        // Handle initialisation
        function onLoad($tipi)
        {
            $this->tipi = $tipi;
        }

        // Handle page content parsing of custom block
        function onParseContentBlock($page, $name, $text, $shortcut)
        {
            $output = null;
            if($name=="example" && $shortcut)
            {
                $output = "<div class=\"".htmlspecialchars($name)."\">";
                $output .= "Add more HTML code here";
                $output .= "</div>";
            }
            return $output;
        }
    }
    $tipi->plugins->register("example", "TipiExample", TipiExample::VERSION);
    ?>
```

Here's an example plugin for including files `example.css` and `example.js`:

```
    <?php
    class TipiExample
    {
        const VERSION = "0.1.2";
        var $tipi;

        // Handle initialisation
        function onLoad($tipi)
        {
            $this->tipi = $tipi;
        }

        // Handle page extra HTML data
        function onExtra($name)
        {
            $output = null;
            if($name=="header")
            {
                $pluginLocation = $this->tipi->config->get("serverBase").
                $pluginLocation .= $this->tipi->config->get("pluginLocation");
                $output = "<link rel=\"stylesheet\" type=\"text/css\" media=\"all\" href=\"{$pluginLocation}example.css\" />\n";
                $output .= "<script type=\"text/javascript\" src=\"{$pluginLocation}example.js\"></script>\n";
            }
            return $output;
        }
    }
    $tipi->plugins->register("example", "TipiExample", TipiExample::VERSION);
    ?>
```

Here's an example plugin for restricting write access for certain users:

```
    <?php
    class TipiExample
    {
        const VERSION = "0.1.3";
        var $tipi;

        // Handle initialisation
        function onLoad($tipi)
        {
            $this->tipi = $tipi;
        }

        // Handle user restrictions
        function onEditUserRestrictions($email, $location, $fileName, $users)
        {
            return $users->getHome($email)=="/guests/";
        }
    }
    $tipi->plugins->register("example", "TipiExample", TipiExample::VERSION);
    ?>
```

## Formats

The following date formats are available:

`YYYY-MM-DD` = date starting with the year, e.g. `2013-04-07`  
`YYYY-MM-DD HH:MM:SS` = date and time, e.g. `2013-04-07 11:30:00`

When dates are displayed on a [page](#tipi-page) they are converted to a language specific date:

`dateFormatShort` = short date, e.g. `April 2013`  
`dateFormatMedium` = medium date, e.g. `2013-04-07`  
`dateFormatLong` = long date, e.g. `2013-04-07 11:30`

When times are displayed on a [page](#tipi-page) they are converted to a language specific time:

`timeFormatShort` = short time, e.g. `11:30`  
`timeFormatMedium` = medium time, e.g. `11:30:01`  
`timeFormatLong` = long time, e.g. `11:30:01 GMT+1`

When text is displayed you can use one of these encoding functions:

`htmlspecialchars($string)` = encode text string into HTML format  
`rawurlencode($string)` = encode URL, e.g. hyperlink arguments  
`strencode($string)` = encode string, e.g. JavaScript arguments

Here's an example snippet for encoding HTML arguments:

```
    <?php list($name, $class) = $tipi->getSnippetArgs() ?>
    <?php if(empty($class)) $class = "regular" ?>
    <img src="https://unsplash.it/210/140/?random" class="<?php echo htmlspecialchars($class) ?>" />
```

Here's an example snippet for encoding hyperlink arguments:

```
    <?php list($name, $id) = $tipi->getSnippetArgs() ?>
    <?php if(empty($id)) $id = "821" ?>
    <img src="https://unsplash.it/210/140/?image=<?php echo rawurlencode($id) ?>" />
```

Here's an example snippet for encoding JavaScript arguments:

```
    <?php list($name, $message) = $tipi->getSnippetArgs() ?>
    <?php if(empty($message)) $message = "Hello world" ?>
    <script type="text/javascript">
    console.log("<?php echo strencode($message) ?>");
    </script>
```

## Debugging

Open the file `system/plugins/core.php`, change first line to `<?php define("DEBUG", 1);`

    TipiCore::sendPage Content-Type: text/html; charset=UTF-8
    TipiCore::sendPage Page-Modified: Fri, 30 Jan 2015 09:30:12 GMT
    TipiCore::sendPage Last-Modified: Mon, 02 Feb 2015 13:19:03 GMT
    TipiCore::sendPage theme:flatsite template:blogpages parser:markdown
    TipiCore::processRequest file:content/2-plugins/1-blog/page.txt
    TipiCore::request status:200 handler:core time:19 ms

Get file system information by increasing debug level to `<?php define("DEBUG", 2);`

    Datenstrom Tipi 0.7.1, PHP 5.6.30, Apache/2.4.25 Darwin
    TipiConfig::load file:system/config/config.ini
    TipiText::load file:system/plugins/language-de.txt
    TipiText::load file:system/plugins/language-en.txt
    TipiText::load file:system/plugins/language-fr.txt
    TipiUsers::load file:system/config/user.ini
    TipiText::load file:system/config/text.ini

Get maximum information by increasing debug level to `<?php define("DEBUG", 3);`

    Datenstrom Tipi 0.7.1, PHP 5.6.30, Apache/2.4.25 Darwin
    TipiConfig::load file:system/config/config.ini
    TipiConfig::load Sitename:Datenstrom developers
    TipiConfig::load Author:Datenstrom
    TipiConfig::load Email:webmaster
    TipiConfig::load Language:en
    TipiConfig::load Timezone:Europe/Stockholm
    TipiConfig::load Theme:flatsite

We run [automatic tests and code analysis](/tests/).

## Tips and tricks

Some tips for developers:

1.  [Install the developer kit](https://github.com/datenstrom/tipi-developers). The developer kit for Datenstrom Tipi includes plugins, themes and examples. You can try out how to make small web pages, blogs and wikis. It's a great place to get started.

2.  [Learn the web basics](https://www.w3schools.com). Make yourself familiar with HTML, CSS and JavaScript. These are the most important things you need to know to make websites. You don't need to learn any complex frameworks or libraries.

3.  [Put your code on GitHub](https://github.com/datenstrom/tipi/issues?q=label%3Anews%20). Create a repository for each new plugin/theme. The name of your repository should be `tipi-plugin-xyz` or `tipi-theme-xyz`. Your code doesn't have to be perfect, but it should be working in the developer kit.
