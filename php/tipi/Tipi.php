<?php
class Tipi {
    private static $instance;
    
    private $root;
    private $config;
    private $plugins;
    private $themes;

    // Don't allow object instantiation
    private function __construct($root, $config, $plugins, $themes) {
      $this->root = $root;
      $this->config = $config;
      $this->plugins = $plugins;
      $this->themes = $themes;
    }
    
    private function __destruct() {}
    private function __clone() {}

    public static function init($root, $config, $plugins, $themes) {
      self::$instance = new Tipi($root, $config, $plugins, $themes);
    }
    
    /* TODO:
    public static function config($param, $value = null) {
    }
    */
    
    public static function start() {
    }
    
}
