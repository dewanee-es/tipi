<?php
// load dependencies
require_once(__DIR__ . '/vendor/autoload.php');

// init Tipi
Tipi::init(
    __DIR__,    // root dir
    'config/',  // config dir
    'plugins/', // plugins dir
    'themes/'   // themes dir
);

// override configuration?
// Tipi::config("option", "value");
// Tipi::config(array("option" => "value", ...));

// start application
Tipi::start();
