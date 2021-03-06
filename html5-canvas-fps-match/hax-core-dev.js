var usingBackground = true
var usingCanvasBG = false

var supportCanvasToDataURL = false, ImgData = {}

function createCanvas(w, h) {
    var c = document.createElement('canvas')
	c.width = w
	c.height = h
	//document.body.appendChild(c)
	//c.style.visibility = 'hidden'
	return c
}
function saveImage(id, w, h, f) {
	var ctx
	ctx = document.getCSSCanvasContext("2d", id, w, h)
	if (!ctx) ctx = createCanvas(w, h).getContext('2d')
	f(ctx)
	
	ImgData[id] = ctx.getImageData(0, 0, w, h)
	
	if (supportCanvasToDataURL) {
		ImgCache[id] = new Image()
		ImgCache[id].src = ctx.canvas.toDataURL()
	} else {
		ImgCache[id] = ctx.canvas
	}
}

function initData() {
	
	supportCanvasToDataURL = createCanvas(1, 1).toDataURL('image/png').indexOf('data:image/png') != -1
	
	saveImage('bg', width, height, function (context) {
		context.fillStyle = bgColor;
		context.fillRect(0,0,canvas.width,canvas.height);
		context.drawImage(ImgCache["text"],5,50);
		context.drawImage(ImgCache["logo"],225,30);
	})	
	saveImage('ball', ballRadius * 2, ballRadius * 2, function(context) {
		context.beginPath();
		context.arc(ballRadius, ballRadius, ballRadius,0, 2 * Math.PI, false);
		context.fillStyle=ballColor;
		context.fill();
		context.stroke();
		context.closePath();
		context.drawImage(ImgCache['icon'], ballRadius-iconRadius, ballRadius-iconRadius );
	})
	
	if (usingBackground) {
		canvas.style.backgroundRepeat = 'no-repeat'
		canvas.style.backgroundImage = supportCanvasToDataURL ? 
			new Array(ballNum + 1).join('url(' + ImgCache.ball.src + '),') + 'url(' + ImgCache.bg.src + ')' :
			new Array(ballNum + 1).join('-webkit-canvas(ball),') + '-webkit-canvas(bg)'
	} else if (usingCanvasBG) {
		canvas.style.background = '-webkit-canvas(myCanvas) no-repeat'
		myContext = document.getCSSCanvasContext("2d", 'myCanvas', width, height)
	} else {
		myContext = context
	}
	
}

var minX = 0, minY = 0, maxX = width - ballRadius * 2, maxY = height - ballRadius * 2;

if (usingBackground) {
	testCore = function (dt) {
		
		var minX = 0, minY = 0, maxX = canvas.width - ballRadius * 2, maxY = canvas.height - ballRadius * 2;
		
		var bgPos = ''//, bgPosX = '', bgPosY = ''
		
		for (var bl = ballList, i = 0, b; i < ballNum; i++) {
			b = bl[i];
			b.x += b.speedX * dt;
			b.y += b.speedY * dt;
			if (b.x < minX) {
				b.x = minX; b.speedX = getNewSpeed();
			} else if (b.x > maxX){
				b.x = maxX; b.speedX= -getNewSpeed();
			}
			if (b.y < minY) {
				b.y = minY; b.speedY = getNewSpeed();
			} else if (b.y > maxY){
				b.y = maxY; b.speedY = -getNewSpeed();
			}
			bgPos += b.x + 'px ' + b.y + 'px,'
			//bgPosX += b.x + 'px,'
			//bgPosY += b.y + 'px,'
		}
		canvas.style.backgroundPosition = bgPos + '0 0'
		//canvas.style.backgroundPositionX = bgPosX + '0'
		//canvas.style.backgroundPositionY = bgPosY + '0'
	}
} else {
	testCore = function (dt) {
		
		//ctx.putImageData(ImgData.bg, 0, 0);
		//var ball = ImgData.ball;
		myContext.drawImage(ImgCache.bg, 0, 0);
		
		for (var bl = ballList, i = 0, b; i < ballNum; i++) {
			b = bl[i]
			//b.update(dt)
			b.x += b.speedX * dt;
			b.y += b.speedY * dt;
			if (b.x < minX) {
				b.x = minX; b.speedX = getNewSpeed();
			} else if (b.x > maxX){
				b.x = maxX; b.speedX= -getNewSpeed();
			}
			if (b.y < minY) {
				b.y = minY; b.speedY = getNewSpeed();
			} else if (b.y > maxY){
				b.y = maxY; b.speedY = -getNewSpeed();
			}
			//ctx.putImageData(ball, b.x, b.y)
			myContext.drawImage(ImgCache.ball, b.x, b.y)
		}
	}
}


/*testCore = compileUpdateBalls()
function compileUpdateBalls() {
	var s = 'var newSpeed = getNewSpeed, bl = ballList, b, minX = 0, minY = 0, maxX = canvas.width - ballRadius * 2, maxY = canvas.height - ballRadius * 2;\r\n'
	s += 'var ctx = context; ctx.putImageData(bgImgData, 0, 0); var ballImg = ImgCache.ball;'
	for (var i = 0; i < ballNum; i++)
		s +=
			'b = bl[' + i + '];' +
			'b.x += b.speedX * dt;' +
			'b.y += b.speedY * dt;' +
			'if (b.x < minX) {' +
			'b.x = minX; b.speedX = newSpeed();' +
			'} else if (b.x > maxX){' +
			'b.x = maxX; b.speedX= -newSpeed();' +
			'}' +
			'if (b.y < minY) {' +
			'b.y = minY; b.speedY = newSpeed();' +
			'} else if (b.y > maxY){' +
			'b.y = maxY; b.speedY = -newSpeed();' +
			'}\n' +
			'ctx.drawImage(ballImg, b.x, b.y);\n'

	return new Function('dt', s)
}*/


// 初始化所有小球.参赛选手可修改的函数,不可改变函数名, 不能改变函数的输入输出:无参数, 无返回值.  
function initBallList(){

	initData()
	
	ballList=[];
	// 小球上的icon对应的图片
	//var img=ImgCache["icon"];
	
	for (var i=0;i<ballNum;i++){
		var ball = {
			//img : img ,
			
			//初始坐标
			x : 0,//ballRadius,
			y : 0,//ballRadius,

			//现代移动区域
			minX : 0,//ballRadius,
			minY : 0,//ballRadius,
			maxX : canvas.width-ballRadius * 2,
			maxY : canvas.height-ballRadius * 2,
			
			// 必须使用模板提供的 getNewSpeed 来取得新的速度
			speedX : getNewSpeed(),
			speedY : getNewSpeed(),
			
			update : function(deltaTime){
				this.x+=this.speedX*deltaTime;
				this.y+=this.speedY*deltaTime;

				if (this.x<this.minX){
					this.x=this.minX;
					this.speedX= getNewSpeed();
				}else if (this.x>this.maxX){
					this.x=this.maxX;
					this.speedX= -getNewSpeed();		
				}
				if (this.y<this.minY){
					this.y=this.minY;
					this.speedY=getNewSpeed();
				}else if (this.y>this.maxY){
					this.y=this.maxY;
					this.speedY= -getNewSpeed();		
				}			

			}
		};
		ballList.push( ball );
	}
}

// 动画测试的核心函数.参赛选手可修改的函数,不可改变函数名, 不能改变函数的输入输出:参数deltaTime, 无返回值. 
//function testCore(deltaTime){

	/*context.fillStyle = bgColor;
	context.fillRect(0,0,canvas.width,canvas.height);
	context.drawImage(ImgCache["text"],5,50);
	context.drawImage(ImgCache["logo"],225,30);*/
	
	//updateBalls(deltaTime)
	

	//for (var i=0;i<ballNum;i++){
		//var ball=ballList[i];
		//ball.update(deltaTime);
		
		//
		/*context.beginPath();
		context.arc(ball.x, ball.y, ballRadius,0, 2*Math.PI,false);
		context.fillStyle=ballColor;
		context.fill();
		context.stroke();
		context.closePath();
		context.drawImage(ball.img, ball.x-iconRadius, ball.y-iconRadius );*/
		
		//ctx.drawImage(ballImg, ball.x, ball.y)
	//}	
//}

