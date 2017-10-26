<?php
require 'tipi/Tipi.php';

Tipi::set('config_path', 'config/');
Tipi::load('system/');
Tipi::load('plugins/');

Tipi::run();
?>