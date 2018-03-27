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
     * Sort files in alphabetical ascending order
     *
     * @see Core::doFilesGet()
     * @var int
     */
    public const SORT_ASC = 0;

    /**
     * Sort files in alphabetical descending order
     *
     * @see Core::doFilesGet()
     * @var int
     */
    public const SORT_DESC = 1;

    /**
     * Don't sort files
     *
     * @see Core::doFilesGet()
     * @var int
     */
    public const SORT_NONE = 2;

	/**
	 * Service Container
	 *
     * @var ServiceContainer|null
	 */
	private $container;

    /**
     * Constructs a new Morphus instance
     *
     * To carry out all the processing in Morphus, call {@link Morphus::run()}.
     *
     * @param string $rootDir    root directory of this Morphus instance
     * @param string $configDir  config directory of this Morphus instance
     * @param string $pluginsDir plugins directory of this Morphus instance
     * @param string $themesDir  themes directory of this Morphus instance
     */
    public function __construct($rootDir, $configDir, $pluginsDir, $themesDir)
    {
		$this->loadContainer();
        $this->container->rootDir = rtrim($rootDir, '/') . '/';
		$this->container->call('core.path.absolute', array(&$configDir));
        $this->container->configDir = $configDir;
		$this->container->call('core.path.absolute', array(&$pluginsDir));
        $this->container->pluginsDir = $pluginsDir;
		$this->container->call('core.path.absolute', array(&$themesDir));
        $this->container->themesDir = $themesDir;
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
	
        // load plugins
        $this->container->call('core.plugins.load', array(&$plugins));
        $this->container->plugins = $plugins;

        // load config
        $this->container->call('core.config.load', array(&$config));
		$this->container->config = $config;

        // evaluate request url
        $this->container->call('core.request.url', array(&$requestUrl);
		$this->container->requestUrl = $requestUrl;

        // discover requested file
        $this->container->call('repo.request.file', array(&$requestFile));
		$this->container->requestFile = $requestFile;

        // load raw file content
		$this->container->call('repo.content.load', array(&$requestFile, &$rawContent));
		$this->container->rawContent = $rawContent;

        // parse file meta
        $this->container->call('page.meta.headers', array(&$headers)));
        $this->container->call('page.meta.parse', array(&$rawContent, &$headers, &$meta);
		$this->container->meta = $meta;

        // parse file content
        $this->container->call('page.content.prepare', array(&$rawContent, &$content));
        $this->container->call('page.content.parse', array(&$content));
		$this->container->content = $content;

        // read pages
        $this->container->call('repo.pages.read', array(&$pages));
        $this->container->call('repo.pages.sort', array(&$pages));
		$this->container->call('repo.pages.current', array(&$pages, &$currentPage, &$previousPage, &$nextPage));
		$this->container->pages = $pages;
		$this->container->currentPage = $currentPage;
		$this->container->previousPage = $previousPage;
		$this->container->nextPage = $nextPage;

        // register template
        $this->container->call('page.template.register');

        // render template
        $this->container->call('page.template.variables');
		$output = $this->container->call('page.template.render')->output;

        return $output;
    }

    /**
     * Load service container
     *
     */
    protected function loadContainer()
	{
	
		$this->container = new ServiceContainer;
        $serviceFiles = glob(__DIR__ . '/services/*.php');
        foreach ($serviceFiles as $serviceFile) {
            require_once($serviceFile);

            $className = basename($serviceFile, '.php');
            if (class_exists($className)) {
                $service = new $className($this->container);
				$this->container->register(strtolower($className), $service, -10);	// Default services has a priority of -10
            }
        }
		
    }

}
