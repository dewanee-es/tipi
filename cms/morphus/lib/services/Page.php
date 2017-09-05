<?php

class Page {

	protected $container;

	public function __construct(&$container) {
		$this->container =& $container;
	}
	
    /**
     * Returns known meta headers
     *
     * @param string[] known meta headers; the array value specifies the
     *     YAML key to search for, the array key is later used to access the
     *     found value
     */
    public function doMetaHeaders(&$headers)
    {
        $headers = array(
            'title' => 'Title',
            'description' => 'Description',
            'author' => 'Author',
            'date' => 'Date',
            'robots' => 'Robots',
            'template' => 'Template'
        );
    }

    /**
     * Parses the file meta from raw file contents
     *
     * Meta data MUST start on the first line of the file, either opened and
     * closed by `---` or C-style block comments (deprecated). The headers are
     * parsed by the YAML component of the Symfony project, keys are lowered.
     * If you're a plugin developer, you MUST register new headers during the
     * `doMetaHeaders` service first. The implicit availability of headers is
     * for users and pure (!) theme developers ONLY.
     *
     * @see    <http://symfony.com/doc/current/components/yaml/introduction.html>
     * @param  string   $rawContent the raw file contents
     * @param  string[] $headers    known meta headers
     * @param  array    $meta       parsed meta data
     */
    public function doMetaParse(&$rawContent, array &$headers, &$meta)
    {
        $meta = array();
        $pattern = "/^(\/(\*)|---)[[:blank:]]*(?:\r)?\n"
            . "(.*?)(?:\r)?\n(?(2)\*\/|---)[[:blank:]]*(?:(?:\r)?\n|$)/s";
        if (preg_match($pattern, $rawContent, $rawMetaMatches)) {
            $yamlParser = new \Symfony\Component\Yaml\Parser();
            $meta = $yamlParser->parse($rawMetaMatches[3]);
            $meta = array_change_key_case($meta, CASE_LOWER);

            foreach ($headers as $fieldId => $fieldName) {
                $fieldName = strtolower($fieldName);
                if (isset($meta[$fieldName])) {
                    // rename field (e.g. remove whitespaces)
                    if ($fieldId != $fieldName) {
                        $meta[$fieldId] = $meta[$fieldName];
                        unset($meta[$fieldName]);
                    }
                } else {
                    // guarantee array key existance
                    $meta[$fieldId] = '';
                }
            }

            if (!empty($meta['date'])) {
                $meta['time'] = strtotime($meta['date']);
				$this->container->call('core.config.get', array('date_format', &$dateFormat));
                $meta['date_formatted'] = utf8_encode(strftime($dateFormat, $meta['time']));
            } else {
                $meta['time'] = $meta['date_formatted'] = '';
            }
        } else {
            // guarantee array key existance
            foreach ($headers as $id => $field) {
                $meta[$id] = '';
            }

            $meta['time'] = $meta['date_formatted'] = '';
        }
    }

}