<?php
/**
 * Created by PhpStorm.
 * User: hax
 * Date: 3/6/14
 * Time: 10:49 PM
 */

namespace My;


class Test1__AopProxied {

    public function a() {
        return test1() . 'a';
    }
}

include_once '/Users/hax/TestAOP/aop_cache/_proxies/My/Test1.php';



function test1() {
    return 'test1';
}