<?php
// load dependencies
require_once(__DIR__ . '/vendor/autoload.php');

// instance Morphus
$morphus = new Morphus(
    __DIR__,    // root dir
    'config/',  // config dir
    'plugins/', // plugins dir
    'themes/'   // themes dir
);

// override configuration?
// $morphus->setConfig(array());

// run application
echo $morphus->run();
