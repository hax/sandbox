<?php
/**
 * Created by PhpStorm.
 * User: hax
 * Date: 3/6/14
 * Time: 10:23 PM
 */


include __DIR__ . '/vendor/autoload.php'; // use composer

// Initialize an application aspect container
$kernel = MyKernel::getInstance();
$kernel->init(array(
    'debug' => true, // use 'false' for production mode
    // Cache directory
    'cacheDir'  => __DIR__ . '/aop_cache',
    // Include paths restricts the directories where aspects should be applied, or empty for all source files
    'includePaths' => array(
        __DIR__
    ),
    'interceptFunctions' => true
));


Collator::ALTERNATE_HANDLING;
$test = new My\Test2();
var_dump($test->a());