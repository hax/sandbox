<?php
/**
 * Created by PhpStorm.
 * User: hax
 * Date: 3/6/14
 * Time: 10:42 PM
 */

namespace Hax;


use Go\Aop\Aspect;
use Go\Aop\Intercept\FieldAccess;
use Go\Aop\Intercept\FunctionInvocation;
use Go\Aop\Intercept\MethodInvocation;
use Go\Lang\Annotation\After;
use Go\Lang\Annotation\Before;
use Go\Lang\Annotation\Around;
use Go\Lang\Annotation\Pointcut;

/**
 * Monitor aspect
 */
class MonitorAspect implements Aspect
{

    /**
     * Method that will be called before real method
     *
     * @param MethodInvocation $invocation Invocation
     * @Around("execution(public My\Test1->a(*))")
     */
    public function beforeMethodExecution(MethodInvocation $invocation)
    {
        $obj = $invocation->getThis();
        echo
        is_object($obj) ? get_class($obj) : $obj,
        $invocation->getMethod()->isStatic() ? '::' : '->',
        $invocation->getMethod()->getName(),
        '(',
        substr(json_encode($invocation->getArguments()), 1, -1),
        ')',
        "\n";
    }

    /**
     * @param FunctionInvocation $invocation
     * @Around("execution(My\test1(*))")
     */
    public function aroundFunctionCall(FunctionInvocation $invocation) {
        var_dump($invocation);
    }
}