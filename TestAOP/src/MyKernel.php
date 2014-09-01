<?php
/**
 * Created by PhpStorm.
 * User: hax
 * Date: 3/6/14
 * Time: 10:25 PM
 */

class MyKernel extends \Go\Core\AspectKernel {


    /**
     * Configure an AspectContainer with advisors, aspects and pointcuts
     *
     * @param \Go\Core\AspectContainer $container
     *
     * @return void
     */
    protected function configureAop(\Go\Core\AspectContainer $container)
    {
        $container->registerAspect(new \Hax\MonitorAspect());
    }
}