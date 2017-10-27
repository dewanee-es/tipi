<?php
class Tipi {
	
	private static final $instance;
	
	private $plugins = [];
	private $values = [];
	
	public static instance() {
		if(!$instance) {
			$instance = new Tipi();
		}
		
		return $instance;
	}

	public static get($name) {
		return self::instance()->_get($name);
	}
	
	public static set($name, $value) {
		self::instance()->_set($name, $value);
	}
	
	public static load($path) {
		self::instance()->_load($path);
	}
	
	private _get($name) {
		return $this->values[$name];
	}
	
	private _set($name, $value) {
		$this->values[$name] = $value;
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
	
	private _loadJson($file) {
		$contents = file_get_contents($file);
		$json = json_decode($contents);
		
		foreach($json as $key => $value) {
			$this->_load($value);
		}
	}
	
	private _loadPlugin($class_name) {
		$this->plugins[] = new $class_name();
	}
	
}