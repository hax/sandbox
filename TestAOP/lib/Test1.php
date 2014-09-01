<?php
/**
 * Created by PhpStorm.
 * User: hax
 * Date: 3/6/14
 * Time: 10:49 PM
 */

namespace My;


class Test1 {

    public function a() {
        return test1() . 'a';
    }
}

function test1() {
    return 'test1';
}