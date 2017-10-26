<?php
class Tipi {

	public static load($path) {
		$tipi = self::instance();
		$tipi->_load($path);
	}
	
	private _load($path) {
		if(file_exists($path)) {
			if(is_dir($path)) {
				$this->_loadDir($path);
			} else {
				$extension = pathinfo($path, PATHINFO_EXTENSION);
				if($extension == 'php') {
					$this->_loadFile($path);
				} else if($extension == 'json') {
					$this->_loadJson($path);
				}
			}
		}
	}
	
	private _loadDir($path) {
		$basename = pathinfo($path, PATHINFO_BASENAME);
		$json = rtrim($path, PATH_SEPARATOR) . PATH_SEPARATOR . $basename . '.json';
		$php = rtrim($path, PATH_SEPARATOR) . PATH_SEPARATOR . $basename . '.php';
		if(file_exists($json)) {
			$this->_loadJson($json);
		} else if(file_exists($php)) {
			$this->_loadFile($php);
		} else {
			$files = scandir($path);
			foreach($files as $file) {
				if(is_dir($file)) {
					$this->_loadDir($file);
				} else if(pathinfo($file, PATHINFO_EXTENSION) == 'php') {
					$this->_loadFile($file);
				}
			}
		}
	}
	
	private _loadFile($file) {
        require_once($file);
        $class_name = substr($file, 0, -4);
		$this->_loadPlugin($class_name);
	}
	
	private _loadPlugin($class_name, $plugin_name = null) {
		if(!$plugin_name) {
			$plugin_name = $class_name;
		}
		
        $this->plugins[$plugin_name]= new $class_name();
	}
	
}