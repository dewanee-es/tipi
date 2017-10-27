<?php
// load dependencies
require_once(__DIR__ . '/vendor/autoload.php');

// set configuration path
Tipi::set('config_path', 'config/');

// init Tipi
Tipi::load('system/');
Tipi::load('plugins/');

// run application
Tipi::run();