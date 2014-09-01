<?php
/**
 * Created by PhpStorm.
 * User: hax
 * Date: 3/6/14
 * Time: 10:50 PM
 */

namespace My;


class Test2 extends Test1 {

    public function a() {
        return parent::a() . '2';
    }
} 