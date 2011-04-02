// 小球数量
var ballNum=60;
//画布宽高 
var width=480 , height=300;
// 期望帧频
var FPS=100;

// canvas画线的颜色
var strokeColor="#000";
//背景的颜色
var bgColor="#0091be";
//小球的颜色
var ballColor="#ddeeff";
// 小球半径
var ballRadius=24;
// 小球上图标的半径
var iconRadius=16;

/******** 以上常量 禁止修改  ********/

//存放小球的集合
var ballList=null;

//存放图片的缓存
var ImgCache=null;


//动画主循环
var mainLoop=null;


//画布
var canvas=null;
//绘画上下文  = canvas.getContext("2d");
var context=null;
// 画布的容器,一个div
var box=null;




var logger={
	frameCount : 0,
	dom : null,
	logLoop : null
};


// 加载图片的工具方法
function loadImage(srcList,callback){
	var imgs={};
	var totalCount=srcList.length;
	var loadedCount=0;
	for (var i=0;i<totalCount;i++){
		var img=srcList[i];
		var image=imgs[img.id]=new Image();		
		image.src=img.url;
		image.onload=function(event){
			loadedCount++;
		}		
	}
	if (typeof callback=="function"){
		var Me=this;
		function check(){
			if (loadedCount>=totalCount){
				callback.apply(Me,arguments);
			}else{		
				setTimeout(check,100);
			}	
		}
		check();
	}
	return imgs;
}


// 取得指定区间内的随机整数 (闭区间)
function genRandom(lower, higher) {
	lower = lower || 0;
	higher = higher || 9999;
	return Math.floor( (higher - lower + 1) * Math.random() ) + lower;
}

// 随机取得小球的移动速度
function getNewSpeed(){
	return genRandom(50,110)/1000;
}

// 更具id取得dom对象
function $(id){
	return document.getElementById(id)||id;
}


// 页面初始化
function init(){
	
	// 初始化画布容器
	box=$("box");
	box.style.width=width+"px";
	box.style.height=height+"px";
	
	// 初始化画布 和 上下文
	canvas=$("canvas");
	canvas.width=width;
	canvas.height=height;	
	context=canvas.getContext("2d");
	context.strokeStyle= strokeColor;
	
	//加载图片, 加载后 调用 startTest
	ImgCache=loadImage( [ 
			{ 	id : "icon",
				url : "icon.png"
			},
			{ 	id : "text",
				url : "text.png"
			},
			{ 	id : "logo",
				url : "logo.png"
			}
		], 
		startTest );
	
	// 开始计算FPS
	logger.dom=$("fps");
	logger.logLoop=setInterval(function(){
		if (mainLoop!==null){
			logger.dom.innerHTML=logger.frameCount;
			logger.frameCount=0;
		}
	
	},1000);
	
}

// 测试函数
function startTest(){
	
	// 计算迭代间隔
	var sleep=Math.floor(1000/FPS);
	
	// 初始化所有小球. 参赛选手可修改的函数, 见 core.js
	initBallList();
	
	// 主循环
	mainLoop=setInterval(function(){
		
		logger.frameCount++;
		
		// 两次迭代的间隔时间, 在这里用理想状态下的间隔代替 == sleep
		var deltaTime=sleep;

		// 动画测试的核心函数. 参赛选手可修改的函数, 见 core.js
		testCore(deltaTime)
		

		
	},sleep);

}

window.onload=init;
