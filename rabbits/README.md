# 传说中百度的一道C#面试题。改造为JavaScript的题目。 #

一对小兔子一年后长成大兔子；一对大兔子每半年生一对小兔子。
大兔子的繁殖期为4年，兔子的寿命是6年。
假定第一年年初投放了一对小兔子，试编程计算，第n年末总共会有多少对兔子。
原题载：http://www.cnblogs.com/zuozuo/archive/2011/09/18/2180426.html


### 参考答案 ###

http://hax.github.com/sandbox/rabbits/rabbits.html

* simulation.js 以仿真的思路实现，但产生了大量对象并需要遍历所有对象，复杂度是指数级的，效率低下。

* simple.js 以数组保存每代兔子的个数，以unshift操作加入新生代兔子（亦可改造为使用push操作），复杂度是O(n)，正解。