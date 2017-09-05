<?php

/**
 * Morphus
 *
 * Morphus is a stupidly simple, blazing fast, flat file CMS.
 * - Stupidly Simple: Picos makes creating and maintaining a
 *   website as simple as editing text files.
 * - Blazing Fast: Morphus is seriously lightweight and doesn't
 *   use a database, making it super fast.
 * - No Database: Morphus is a "flat file" CMS, meaning no
 *   database woes, no MySQL queries, nothing.
 * - Markdown Formatting: Edit your website in your favourite
 *   text editor using simple Markdown formatting.
 * - Twig Templates: Morphus uses the Twig templating engine,
 *   for powerful and flexible themes.
 * - Open Source: Morphus is completely free and open source,
 *   released under the MIT license.
 * See <http://picocms.org/> for more info.
 *
 * @author  Gilbert Pellegrom
 * @author  Daniel Rudolf
 * @link    <http://morphuscms.org>
 * @license The MIT License <http://opensource.org/licenses/MIT>
 * @version 1.0
 */
class Morphus
{
    /**
     * Root directory of this Morphus instance
     *
     * @see Morphus::getRootDir()
     * @var string
     */
    protected $rootDir;

    /**
     * Config directory of this Morphus instance
     *
     * @see Morphus::getConfigDir()
     * @var string
     */
    protected $configDir;

    /**
     * Plugins directory of this Morphus instance
     *
     * @see Morphus::getPluginsDir()
     * @var string
     */
    protected $pluginsDir;

    /**
     * Themes directory of this Morphus instance
     *
     * @see Morphus::getThemesDir()
     * @var string
     */
    protected $themesDir;

    /**
     * Boolean indicating whether Morphus processing started yet
     *
     * @var boolean
     */
    protected $locked = false;

    /**
     * List of loaded plugins
     *
     * @see Morphus::getPlugins()
     * @var object[]|null
     */
    protected $plugins;

    /**
     * Current configuration of this Morphus instance
     *
     * @see Morphus::getConfig()
     * @var mixed[]|null
     */
    protected $config;

    /**
     * Part of the URL describing the requested contents
     *
     * @see Morphus::getRequestUrl()
     * @var string|null
     */
    protected $requestUrl;

    /**
     * Absolute path to the content file being served
     *
     * @see Morphus::getRequestFile()
     * @var string|null
     */
    protected $requestFile;

    /**
     * Raw, not yet parsed contents to serve
     *
     * @see Morphus::getRawContent()
     * @var string|null
     */
    protected $rawContent;

    /**
     * Meta data of the page to serve
     *
     * @see Morphus::getFileMeta()
     * @var string[]|null
     */
    protected $meta;

    /**
     * Parsed content being served
     *
     * @see Morphus::getFileContent()
     * @var string|null
     */
    protected $content;

    /**
     * List of known pages
     *
     * @see Morphus::getPages()
     * @var array[]|null
     */
    protected $pages;

    /**
     * Data of the page being served
     *
     * @see Morphus::getCurrentPage()
     * @var array|null
     */
    protected $currentPage;

    /**
     * Data of the previous page relative to the page being served
     *
     * @see Morphus::getPreviousPage()
     * @var array|null
     */
    protected $previousPage;

    /**
     * Data of the next page relative to the page being served
     *
     * @see Morphus::getNextPage()
     * @var array|null
     */
    protected $nextPage;

    /**
     * Variables passed to the twig template
     *
     * @see Morphus::getTwigVariables
     * @var mixed[]|null
     */
    protected $twigVariables;

    /**
     * Returns the root directory of this Morphus instance
     *
     * @return string root directory path
     */
    public function getRootDir()
    {
        return $this->rootDir;
    }

    /**
     * Returns the config directory of this Morphus instance
     *
     * @return string config directory path
     */
    public function getConfigDir()
    {
        return $this->configDir;
    }

    /**
     * Returns the plugins directory of this Morphus instance
     *
     * @return string plugins directory path
     */
    public function getPluginsDir()
    {
        return $this->pluginsDir;
    }

    /**
     * Returns the themes directory of this Morphus instance
     *
     * @return string themes directory path
     */
    public function getThemesDir()
    {
        return $this->themesDir;
    }

    /**
     * Runs this Morphus instance
     *
     * Loads plugins, evaluates the config file, does URL routing, parses
     * meta headers, processes Markdown, does Twig processing and returns
     * the rendered contents.
     *
     * @return string rendered Morphus contents
     */
    public function run()
    {
        // lock Pico
        $this->locked = true;

        // load plugins
        $this->loadPlugins();
        $this->triggerEvent('onPluginsLoaded', array(&$this->plugins));

        // load config
        $this->loadConfig();
        $this->triggerEvent('onConfigLoaded', array(&$this->config));

        // evaluate request url
        $this->evaluateRequestUrl();
        $this->triggerEvent('onRequestUrl', array(&$this->requestUrl));

        // discover requested file
        $this->discoverRequestFile();
        $this->triggerEvent('onRequestFile', array(&$this->requestFile));

        // load raw file content
        $this->triggerEvent('onContentLoading', array(&$this->requestFile));

        if (file_exists($this->requestFile)) {
            $this->rawContent = $this->loadFileContent($this->requestFile);
        } else {
            $this->triggerEvent('on404ContentLoading', array(&$this->requestFile));

            header($_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found');
            $this->rawContent = $this->load404Content($this->requestFile);

            $this->triggerEvent('on404ContentLoaded', array(&$this->rawContent));
        }

        $this->triggerEvent('onContentLoaded', array(&$this->rawContent));

        // parse file meta
        $headers = $this->getMetaHeaders();

        $this->triggerEvent('onMetaParsing', array(&$this->rawContent, &$headers));
        $this->meta = $this->parseFileMeta($this->rawContent, $headers);
        $this->triggerEvent('onMetaParsed', array(&$this->meta));

        // parse file content
        $this->triggerEvent('onContentParsing', array(&$this->rawContent));

        $this->content = $this->prepareFileContent($this->rawContent);
        $this->triggerEvent('onContentPrepared', array(&$this->content));

        $this->content = $this->parseFileContent($this->content);
        $this->triggerEvent('onContentParsed', array(&$this->content));

        // read pages
        $this->triggerEvent('onPagesLoading');

        $this->readPages();
        $this->sortPages();
        $this->discoverCurrentPage();

        $this->triggerEvent('onPagesLoaded', array(
            &$this->pages,
            &$this->currentPage,
            &$this->previousPage,
            &$this->nextPage
        ));

        // register twig
        $this->triggerEvent('onTwigRegistration');
        $this->registerTwig();

        // render template
        $this->twigVariables = $this->getTwigVariables();
        if (isset($this->meta['template']) && $this->meta['template']) {
            $templateName = $this->meta['template'];
        } else {
            $templateName = 'index';
        }
        if (file_exists($this->getThemesDir() . $this->getConfig('theme') . '/' . $templateName . '.twig')) {
            $templateName .= '.twig';
        } else {
            $templateName .= '.html';
        }

        $this->triggerEvent('onPageRendering', array(&$this->twig, &$this->twigVariables, &$templateName));

        $output = $this->twig->render($templateName, $this->twigVariables);
        $this->triggerEvent('onPageRendered', array(&$output));

        return $output;
    }

    /**
     * Returns all loaded plugins
     *
     * @see    Pico::loadPlugins()
     * @see    Pico::getPlugin()
     * @return object[]|null
     */
    public function getPlugins()
    {
        return $this->plugins;
    }

    /**
     * Loads the config.php from Pico::$configDir
     *
     * @see    Pico::setConfig()
     * @see    Pico::getConfig()
     * @return void
     */
    protected function loadConfig()
    {
        $config = null;
        $defaultConfig = array(
            'site_title' => 'Pico',
            'base_url' => '',
            'rewrite_url' => null,
            'theme' => 'default',
            'date_format' => '%D %T',
            'twig_config' => array('cache' => false, 'autoescape' => false, 'debug' => false),
            'pages_order_by' => 'alpha',
            'pages_order' => 'asc',
            'content_dir' => $this->getRootDir() . 'content-sample/',
            'content_ext' => '.md',
            'timezone' => ''
        );

        $configFile = $this->getConfigDir() . 'config.php';
        if (file_exists($configFile)) {
            require $configFile;
        }

        $this->config = is_array($this->config) ? $this->config : array();
        $this->config += is_array($config) ? $config + $defaultConfig : $defaultConfig;

        if (empty($this->config['base_url'])) {
            $this->config['base_url'] = $this->getBaseUrl();
        }
        if (!empty($this->config['content_dir'])) {
            $this->config['content_dir'] = $this->getAbsolutePath($this->config['content_dir']);
        }
        if (!empty($this->config['timezone'])) {
            date_default_timezone_set($this->config['timezone']);
        } else {
            // explicitly set a default timezone to prevent a E_NOTICE
            // when no timezone is set; the `date_default_timezone_get()`
            // function always returns a timezone, at least UTC
            $defaultTimezone = date_default_timezone_get();
            date_default_timezone_set($defaultTimezone);
        }
    }

    /**
     * Sets Picos config before calling Pico::run()
     *
     * This method allows you to modify Picos config without creating a
     * {@path "config/config.php"} or changing some of its variables before
     * Pico starts processing.
     *
     * You can call this method between {@link Pico::__construct()} and
     * {@link Pico::run()} only. Options set with this method cannot be
     * overwritten by {@path "config/config.php"}.
     *
     * @see    Pico::loadConfig()
     * @see    Pico::getConfig()
     * @param  mixed[] $config  array with config variables
     * @return void
     * @throws RuntimeException thrown if Pico already started processing
     */
    public function setConfig(array $config)
    {
        if ($this->locked) {
            throw new RuntimeException('You cannot modify Picos config after processing has started');
        }

        $this->config = $config;
    }

    /**
     * Returns either the value of the specified config variable or
     * the config array
     *
     * @see    Pico::setConfig()
     * @see    Pico::loadConfig()
     * @param  string $configName optional name of a config variable
     * @return mixed              returns either the value of the named config
     *     variable, null if the config variable doesn't exist or the config
     *     array if no config name was supplied
     */
    public function getConfig($configName = null)
    {
        if ($configName !== null) {
            return isset($this->config[$configName]) ? $this->config[$configName] : null;
        } else {
            return $this->config;
        }
    }

    /**
     * Evaluates the requested URL
     *
     * Pico 1.0 uses the `QUERY_STRING` routing method (e.g. `/pico/?sub/page`)
     * to support SEO-like URLs out-of-the-box with any webserver. You can
     * still setup URL rewriting (e.g. using `mod_rewrite` on Apache) to
     * basically remove the `?` from URLs, but your rewritten URLs must follow
     * the new `QUERY_STRING` principles. URL rewriting requires some special
     * configuration on your webserver, but this should be "basic work" for
     * any webmaster...
     *
     * Pico 0.9 and older required Apache with `mod_rewrite` enabled, thus old
     * plugins, templates and contents may require you to enable URL rewriting
     * to work. If you're upgrading from Pico 0.9, you will probably have to
     * update your rewriting rules.
     *
     * We recommend you to use the `link` filter in templates to create
     * internal links, e.g. `{{ "sub/page"|link }}` is equivalent to
     * `{{ base_url }}sub/page`. In content files you can still use the
     * `%base_url%` variable; e.g. `%base_url%?sub/page` will be automatically
     * replaced accordingly.
     *
     * @see    Pico::getRequestUrl()
     * @return void
     */
    protected function evaluateRequestUrl()
    {
        // use QUERY_STRING; e.g. /pico/?sub/page
        // if you want to use rewriting, you MUST make your rules to
        // rewrite the URLs to follow the QUERY_STRING method
        //
        // Note: you MUST NOT call the index page with /pico/?someBooleanParameter;
        // use /pico/?someBooleanParameter= or /pico/?index&someBooleanParameter instead
        $pathComponent = isset($_SERVER['QUERY_STRING']) ? $_SERVER['QUERY_STRING'] : '';
        if (($pathComponentLength = strpos($pathComponent, '&')) !== false) {
            $pathComponent = substr($pathComponent, 0, $pathComponentLength);
        }
        $this->requestUrl = (strpos($pathComponent, '=') === false) ? urldecode($pathComponent) : '';
    }

    /**
     * Returns the URL where a user requested the page
     *
     * @see    Pico::evaluateRequestUrl()
     * @return string|null request URL
     */
    public function getRequestUrl()
    {
        return $this->requestUrl;
    }

    /**
     * Uses the request URL to discover the content file to serve
     *
     * @see    Pico::getRequestFile()
     * @return void
     */
    protected function discoverRequestFile()
    {
        if (empty($this->requestUrl)) {
            $this->requestFile = $this->getConfig('content_dir') . 'index' . $this->getConfig('content_ext');
        } else {
            // prevent content_dir breakouts using malicious request URLs
            // we don't use realpath() here because we neither want to check for file existance
            // nor prohibit symlinks which intentionally point to somewhere outside the content_dir
            // it is STRONGLY RECOMMENDED to use open_basedir - always, not just with Pico!
            $requestUrl = str_replace('\\', '/', $this->requestUrl);
            $requestUrlParts = explode('/', $requestUrl);

            $requestFileParts = array();
            foreach ($requestUrlParts as $requestUrlPart) {
                if (($requestUrlPart === '') || ($requestUrlPart === '.')) {
                    continue;
                } elseif ($requestUrlPart === '..') {
                    array_pop($requestFileParts);
                    continue;
                }

                $requestFileParts[] = $requestUrlPart;
            }

            if (empty($requestFileParts)) {
                $this->requestFile = $this->getConfig('content_dir') . 'index' . $this->getConfig('content_ext');
                return;
            }

            // discover the content file to serve
            // Note: $requestFileParts neither contains a trailing nor a leading slash
            $this->requestFile = $this->getConfig('content_dir') . implode('/', $requestFileParts);
            if (is_dir($this->requestFile)) {
                // if no index file is found, try a accordingly named file in the previous dir
                // if this file doesn't exist either, show the 404 page, but assume the index
                // file as being requested (maintains backward compatibility to Pico < 1.0)
                $indexFile = $this->requestFile . '/index' . $this->getConfig('content_ext');
                if (file_exists($indexFile) || !file_exists($this->requestFile . $this->getConfig('content_ext'))) {
                    $this->requestFile = $indexFile;
                    return;
                }
            }
            $this->requestFile .= $this->getConfig('content_ext');
        }
    }

    /**
     * Returns the absolute path to the content file to serve
     *
     * @see    Pico::discoverRequestFile()
     * @return string|null file path
     */
    public function getRequestFile()
    {
        return $this->requestFile;
    }

    /**
     * Returns the raw contents of a file
     *
     * @see    Pico::getRawContent()
     * @param  string $file file path
     * @return string       raw contents of the file
     */
    public function loadFileContent($file)
    {
        return file_get_contents($file);
    }

    /**
     * Returns the raw contents of the first found 404 file when traversing
     * up from the directory the requested file is in
     *
     * @see    Pico::getRawContent()
     * @param  string $file     path to requested (but not existing) file
     * @return string           raw contents of the 404 file
     * @throws RuntimeException thrown when no suitable 404 file is found
     */
    public function load404Content($file)
    {
        $errorFileDir = substr($file, strlen($this->getConfig('content_dir')));
        do {
            $errorFileDir = dirname($errorFileDir);
            $errorFile = $errorFileDir . '/404' . $this->getConfig('content_ext');
        } while (!file_exists($this->getConfig('content_dir') . $errorFile) && ($errorFileDir !== '.'));

        if (!file_exists($this->getConfig('content_dir') . $errorFile)) {
            $errorFile = ($errorFileDir === '.') ? '404' . $this->getConfig('content_ext') : $errorFile;
            throw new RuntimeException('Required "' . $errorFile . '" not found');
        }

        return $this->loadFileContent($this->getConfig('content_dir') . $errorFile);
    }

    /**
     * Returns the raw contents, either of the requested or the 404 file
     *
     * @see    Pico::loadFileContent()
     * @see    Pico::load404Content()
     * @return string|null raw contents
     */
    public function getRawContent()
    {
        return $this->rawContent;
    }

    /**
     * Returns the parsed meta data of the requested page
     *
     * @see    Pico::parseFileMeta()
     * @return array|null parsed meta data
     */
    public function getFileMeta()
    {
        return $this->meta;
    }

    /**
     * Parses the contents of a page using ParsedownExtra
     *
     * @see    Pico::prepareFileContent()
     * @see    Pico::getFileContent()
     * @param  string $content raw contents of a page (Markdown)
     * @return string          parsed contents (HTML)
     */
    public function parseFileContent($content)
    {
        $parsedown = new ParsedownExtra();
        return $parsedown->text($content);
    }

    /**
     * Returns the cached contents of the requested page
     *
     * @see    Pico::prepareFileContent()
     * @see    Pico::parseFileContent()
     * @return string|null parsed contents
     */
    public function getFileContent()
    {
        return $this->content;
    }

    /**
     * Reads the data of all pages known to Pico
     *
     * The page data will be an array containing the following values:
     * <pre>
     * +----------------+--------+------------------------------------------+
     * | Array key      | Type   | Description                              |
     * +----------------+--------+------------------------------------------+
     * | id             | string | relative path to the content file        |
     * | url            | string | URL to the page                          |
     * | title          | string | title of the page (YAML header)          |
     * | description    | string | description of the page (YAML header)    |
     * | author         | string | author of the page (YAML header)         |
     * | time           | string | timestamp derived from the Date header   |
     * | date           | string | date of the page (YAML header)           |
     * | date_formatted | string | formatted date of the page               |
     * | raw_content    | string | raw, not yet parsed contents of the page |
     * | meta           | string | parsed meta data of the page             |
     * +----------------+--------+------------------------------------------+
     * </pre>
     *
     * @see    Pico::sortPages()
     * @see    Pico::getPages()
     * @return void
     */
    protected function readPages()
    {
        $this->pages = array();
        $files = $this->getFiles($this->getConfig('content_dir'), $this->getConfig('content_ext'), Pico::SORT_NONE);
        foreach ($files as $i => $file) {
            // skip 404 page
            if (basename($file) == '404' . $this->getConfig('content_ext')) {
                unset($files[$i]);
                continue;
            }

            $id = substr($file, strlen($this->getConfig('content_dir')), -strlen($this->getConfig('content_ext')));

            // drop inaccessible pages (e.g. drop "sub.md" if "sub/index.md" exists)
            $conflictFile = $this->getConfig('content_dir') . $id . '/index' . $this->getConfig('content_ext');
            if (in_array($conflictFile, $files, true)) {
                continue;
            }

            $url = $this->getPageUrl($id);
            if ($file != $this->requestFile) {
                $rawContent = file_get_contents($file);
                $meta = $this->parseFileMeta($rawContent, $this->getMetaHeaders());
            } else {
                $rawContent = &$this->rawContent;
                $meta = &$this->meta;
            }

            // build page data
            // title, description, author and date are assumed to be pretty basic data
            // everything else is accessible through $page['meta']
            $page = array(
                'id' => $id,
                'url' => $url,
                'title' => &$meta['title'],
                'description' => &$meta['description'],
                'author' => &$meta['author'],
                'time' => &$meta['time'],
                'date' => &$meta['date'],
                'date_formatted' => &$meta['date_formatted'],
                'raw_content' => &$rawContent,
                'meta' => &$meta
            );

            if ($file == $this->requestFile) {
                $page['content'] = &$this->content;
            }

            unset($rawContent, $meta);

            // trigger event
            $this->triggerEvent('onSinglePageLoaded', array(&$page));

            $this->pages[$id] = $page;
        }
    }

    /**
     * Sorts all pages known to Pico
     *
     * @see    Pico::readPages()
     * @see    Pico::getPages()
     * @return void
     */
    protected function sortPages()
    {
        // sort pages
        $order = $this->getConfig('pages_order');
        $alphaSortClosure = function ($a, $b) use ($order) {
            $aSortKey = (basename($a['id']) === 'index') ? dirname($a['id']) : $a['id'];
            $bSortKey = (basename($b['id']) === 'index') ? dirname($b['id']) : $b['id'];

            $cmp = strcmp($aSortKey, $bSortKey);
            return $cmp * (($order == 'desc') ? -1 : 1);
        };

        if ($this->getConfig('pages_order_by') == 'date') {
            // sort by date
            uasort($this->pages, function ($a, $b) use ($alphaSortClosure, $order) {
                if (empty($a['time']) || empty($b['time'])) {
                    $cmp = (empty($a['time']) - empty($b['time']));
                } else {
                    $cmp = ($b['time'] - $a['time']);
                }

                if ($cmp === 0) {
                    // never assume equality; fallback to alphabetical order
                    return $alphaSortClosure($a, $b);
                }

                return $cmp * (($order == 'desc') ? 1 : -1);
            });
        } else {
            // sort alphabetically
            uasort($this->pages, $alphaSortClosure);
        }
    }

    /**
     * Returns the list of known pages
     *
     * @see    Pico::readPages()
     * @see    Pico::sortPages()
     * @return array|null the data of all pages
     */
    public function getPages()
    {
        return $this->pages;
    }

    /**
     * Walks through the list of known pages and discovers the requested page
     * as well as the previous and next page relative to it
     *
     * @see    Pico::getCurrentPage()
     * @see    Pico::getPreviousPage()
     * @see    Pico::getNextPage()
     * @return void
     */
    protected function discoverCurrentPage()
    {
        $pageIds = array_keys($this->pages);

        $contentDir = $this->getConfig('content_dir');
        $contentExt = $this->getConfig('content_ext');
        $currentPageId = substr($this->requestFile, strlen($contentDir), -strlen($contentExt));
        $currentPageIndex = array_search($currentPageId, $pageIds);
        if ($currentPageIndex !== false) {
            $this->currentPage = &$this->pages[$currentPageId];

            if (($this->getConfig('order_by') == 'date') && ($this->getConfig('order') == 'desc')) {
                $previousPageOffset = 1;
                $nextPageOffset = -1;
            } else {
                $previousPageOffset = -1;
                $nextPageOffset = 1;
            }

            if (isset($pageIds[$currentPageIndex + $previousPageOffset])) {
                $previousPageId = $pageIds[$currentPageIndex + $previousPageOffset];
                $this->previousPage = &$this->pages[$previousPageId];
            }

            if (isset($pageIds[$currentPageIndex + $nextPageOffset])) {
                $nextPageId = $pageIds[$currentPageIndex + $nextPageOffset];
                $this->nextPage = &$this->pages[$nextPageId];
            }
        }
    }

    /**
     * Returns the data of the requested page
     *
     * @see    Pico::discoverCurrentPage()
     * @return array|null page data
     */
    public function getCurrentPage()
    {
        return $this->currentPage;
    }

    /**
     * Returns the data of the previous page relative to the page being served
     *
     * @see    Pico::discoverCurrentPage()
     * @return array|null page data
     */
    public function getPreviousPage()
    {
        return $this->previousPage;
    }

    /**
     * Returns the data of the next page relative to the page being served
     *
     * @see    Pico::discoverCurrentPage()
     * @return array|null page data
     */
    public function getNextPage()
    {
        return $this->nextPage;
    }

    /**
     * Registers the twig template engine
     *
     * @see    Pico::getTwig()
     * @return void
     */
    protected function registerTwig()
    {
        $twigLoader = new Twig_Loader_Filesystem($this->getThemesDir() . $this->getConfig('theme'));
        $this->twig = new Twig_Environment($twigLoader, $this->getConfig('twig_config'));
        $this->twig->addExtension(new Twig_Extension_Debug());
        $this->twig->addFilter(new Twig_SimpleFilter('link', array($this, 'getPageUrl')));
    }

    /**
     * Returns the twig template engine
     *
     * @see    Pico::registerTwig()
     * @return Twig_Environment|null twig template engine
     */
    public function getTwig()
    {
        return $this->twig;
    }

    /**
     * Returns the variables passed to the template
     *
     * URLs and paths (namely `base_dir`, `base_url`, `theme_dir` and
     * `theme_url`) don't add a trailing slash for historic reasons.
     *
     * @return mixed[] template variables
     */
    protected function getTwigVariables()
    {
        $frontPage = $this->getConfig('content_dir') . 'index' . $this->getConfig('content_ext');
        return array(
            'config' => $this->getConfig(),
            'base_dir' => rtrim($this->getRootDir(), '/'),
            'base_url' => rtrim($this->getBaseUrl(), '/'),
            'theme_dir' => $this->getThemesDir() . $this->getConfig('theme'),
            'theme_url' => $this->getBaseUrl() . basename($this->getThemesDir()) . '/' . $this->getConfig('theme'),
            'rewrite_url' => $this->isUrlRewritingEnabled(),
            'site_title' => $this->getConfig('site_title'),
            'meta' => $this->meta,
            'content' => $this->content,
            'pages' => $this->pages,
            'prev_page' => $this->previousPage,
            'current_page' => $this->currentPage,
            'next_page' => $this->nextPage,
            'is_front_page' => ($this->requestFile == $frontPage),
        );
    }

    /**
     * Returns the base URL of this Pico instance
     *
     * @return string the base url
     */
    public function getBaseUrl()
    {
        $baseUrl = $this->getConfig('base_url');
        if (!empty($baseUrl)) {
            return $baseUrl;
        }

        if (
            (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off')
            || ($_SERVER['SERVER_PORT'] == 443)
            || (!empty($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https')
        ) {
            $protocol = 'https';
        } else {
            $protocol = 'http';
        }

        $this->config['base_url'] =
            $protocol . "://" . $_SERVER['HTTP_HOST']
            . dirname($_SERVER['SCRIPT_NAME']) . '/';

        return $this->getConfig('base_url');
    }

    /**
     * Returns true if URL rewriting is enabled
     *
     * @return boolean true if URL rewriting is enabled, false otherwise
     */
    public function isUrlRewritingEnabled()
    {
        if (($this->getConfig('rewrite_url') === null) && isset($_SERVER['PICO_URL_REWRITING'])) {
            return (bool) $_SERVER['PICO_URL_REWRITING'];
        } elseif ($this->getConfig('rewrite_url')) {
            return true;
        }

        return false;
    }

    /**
     * Returns the URL to a given page
     *
     * @param  string $page identifier of the page to link to
     * @return string       URL
     */
    public function getPageUrl($page)
    {
        return $this->getBaseUrl() . ((!$this->isUrlRewritingEnabled() && !empty($page)) ? '?' : '') . $page;
    }

    /**
     * Recursively walks through a directory and returns all containing files
     * matching the specified file extension
     *
     * @param  string $directory     start directory
     * @param  string $fileExtension return files with the given file extension
     *     only (optional)
     * @param  int    $order         specify whether and how files should be
     *     sorted; use Pico::SORT_ASC for a alphabetical ascending order (this
     *     is the default behaviour), Pico::SORT_DESC for a descending order
     *     or Pico::SORT_NONE to leave the result unsorted
     * @return array                 list of found files
     */
    protected function getFiles($directory, $fileExtension = '', $order = self::SORT_ASC)
    {
        $directory = rtrim($directory, '/');
        $result = array();

        // scandir() reads files in alphabetical order
        $files = scandir($directory, $order);
        $fileExtensionLength = strlen($fileExtension);
        if ($files !== false) {
            foreach ($files as $file) {
                // exclude hidden files/dirs starting with a .; this also excludes the special dirs . and ..
                // exclude files ending with a ~ (vim/nano backup) or # (emacs backup)
                if ((substr($file, 0, 1) === '.') || in_array(substr($file, -1), array('~', '#'))) {
                    continue;
                }

                if (is_dir($directory . '/' . $file)) {
                    // get files recursively
                    $result = array_merge($result, $this->getFiles($directory . '/' . $file, $fileExtension, $order));
                } elseif (empty($fileExtension) || (substr($file, -$fileExtensionLength) === $fileExtension)) {
                    $result[] = $directory . '/' . $file;
                }
            }
        }

        return $result;
    }

    /**
     * Makes a relative path absolute to Picos root dir
     *
     * This method also guarantees a trailing slash.
     *
     * @param  string $path relative or absolute path
     * @return string       absolute path
     */
    protected function getAbsolutePath($path)
    {
        if (substr($path, 0, 1) !== '/') {
            $path = $this->getRootDir() . $path;
        }
        return rtrim($path, '/') . '/';
    }

}
