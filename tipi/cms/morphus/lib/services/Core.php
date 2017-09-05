<?php

class Core {

	protected $container;

	public function __construct(&$container) {
		$this->container =& $container;
	}
	
    /**
     * Applies some static preparations to the raw contents of a page,
     * e.g. removing the meta header and replacing %base_url%
     *
     * @param  string $rawContent raw contents of a page
     * @param  string $content    contents prepared for parsing
     */
    public function doContentPrepare(&$rawContent, &$content)
    {
        // remove meta header
        $metaHeaderPattern = "/^(\/(\*)|---)[[:blank:]]*(?:\r)?\n"
            . "(.*?)(?:\r)?\n(?(2)\*\/|---)[[:blank:]]*(?:(?:\r)?\n|$)/s";
        $content = preg_replace($metaHeaderPattern, '', $rawContent, 1);

        // replace %site_title%
		$this->container->call('core.config.get', array('site_title', &$siteTitle));
        $content = str_replace('%site_title%', $siteTitle, $content);

        // replace %base_url%
		$this->container->call('core.url.rewriting', array(&$rewritingEnabled));
        if ($rewritingEnabled) {
            // always use `%base_url%?sub/page` syntax for internal links
            // we'll replace the links accordingly, depending on enabled rewriting
            $content = str_replace('%base_url%?', $this->container->baseUrl, $content);
        } else {
            // actually not necessary, but makes the URL look a little nicer
            $content = str_replace('%base_url%?', $this->container->baseUrl . '?', $content);
        }
        $content = str_replace('%base_url%', rtrim($this->container->baseUrl, '/'), $content);

        // replace %theme_url%
		$this->container->call('core.config.get', array('theme', &$theme));
        $themeUrl = $this->container->baseUrl . basename($this->container->themesDir) . '/' . $theme;
        $content = str_replace('%theme_url%', $themeUrl, $content);

        // replace %meta.*%
        $metaKeys = $metaValues = array();
        foreach ($this->container->meta as $metaKey => $metaValue) {
            if (is_scalar($metaValue) || ($metaValue === null)) {
                $metaKeys[] = '%meta.' . $metaKey . '%';
                $metaValues[] = strval($metaValue);
            }
        }
        $content = str_replace($metaKeys, $metaValues, $content);
    }

    /**
     * Recursively walks through a directory and returns all containing files
     * matching the specified file extension
     *
     * @param  string $directory     start directory
	 * @param  array  $result        returns list of found files
     * @param  string $fileExtension return files with the given file extension
     *     only (optional)
     * @param  int    $order         specify whether and how files should be
     *     sorted; use Morphus::SORT_ASC for a alphabetical ascending order (this
     *     is the default behaviour), Morphus::SORT_DESC for a descending order
     *     or Morphus::SORT_NONE to leave the result unsorted
     */
    public function doFilesGet(&$directory, &$result, &$fileExtension = null, &$order = null)
    {
		$fileExtension = (empty($fileExtension) ? '' : $fileExtension);
		$order = (empty($order) ? Morphus::SORT_ASC : $order);
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
					$this->container->call('core.files.get', array($directory . '/' . $file, &$result2, &$fileExtension, &$order));
                    $result = array_merge($result, $result2);
                } elseif (empty($fileExtension) || (substr($file, -$fileExtensionLength) === $fileExtension)) {
                    $result[] = $directory . '/' . $file;
                }
            }
        }
    }
	
    /**
     * Makes a relative path absolute to Morphus root dir
     *
     * This method also guarantees a trailing slash.
     *
     * @param  string $path relative or absolute path. Returns absolute path.
     */
    public function doPathAbsolute(&$path)
    {
        if (substr($path, 0, 1) !== '/') {
            $path = $this->container->rootDir . $path;
        }
        $path = rtrim($path, '/') . '/';
    }
	
    /**
     * Returns the instance of a named plugin
     *
     * @param  string           $pluginName name of the plugin
     * @param object                       instance of the plugin
     * @throws RuntimeException             thrown when the plugin wasn't found
     */
    public function doPluginGet(&$pluginName, &$plugin)
    {
        if (isset($this->container->plugins[$pluginName])) {
            $plugin = $this->container->plugins[$pluginName];
			return;
        }

        throw new RuntimeException("Missing plugin '" . $pluginName . "'");
    }

    /**
     * Loads plugins from container pluginsDir in alphabetical order
     *
     * Plugin files may be prefixed by a number (e.g. 00-PicoDeprecated.php)
     * to indicate their processing order. You MUST NOT use prefixes between
     * 00 and 19 (reserved for built-in plugins).
     *
     * @return void
     * @throws RuntimeException thrown when a plugin couldn't be loaded
     */
	public function doPluginsLoad(&$plugins) {
        $plugins = array();		
		$this->container->call('core.files.get', array($this->container->pluginsDir, &$pluginFiles, '.php'));
        foreach ($pluginFiles as $pluginFile) {
            require_once($pluginFile);

            $className = preg_replace('/^[0-9]+-/', '', basename($pluginFile, '.php'));
            if (class_exists($className)) {
                // class name and file name can differ regarding case sensitivity
                $plugin = new $className($this->container);
                $className = get_class($plugin);

                $plugins[$className] = $plugin;
            } else {
                // TODO: breaks backward compatibility
                //throw new RuntimeException("Unable to load plugin '".$className."'");
            }
        }
	}

}
