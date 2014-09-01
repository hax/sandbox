<?php
namespace My;


class Test1 extends Test1__AopProxied implements \Go\Aop\Proxy
{


    /**
     *Property was created automatically, do not change it manually
     */
    private static $__joinPoints = array();
    
    
    public function a()
    {
        return self::$__joinPoints['method:a']->__invoke($this);
    }
    
}
\Go\Proxy\ClassProxy::injectJoinPoints('My\Test1', unserialize('a:1:{s:6:"method";a:1:{s:1:"a";a:1:{i:0;C:40:"Go\\Aop\\Framework\\MethodAroundInterceptor":137:{a:1:{s:12:"adviceMethod";a:3:{s:5:"scope";s:6:"aspect";s:6:"method";s:21:"beforeMethodExecution";s:6:"aspect";s:17:"Hax\\MonitorAspect";}}}}}}'));