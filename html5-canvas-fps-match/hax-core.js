
// 初始化所有小球.参赛选手可修改的函数,不可改变函数名, 不能改变函数的输入输出:无参数, 无返回值.  
function initBallList(){
	ballList=[];
	// 小球上的icon对应的图片
	var img=ImgCache["icon"];
	
	for (var i=0;i<ballNum;i++){
		var ball = {
			img : img ,
			
			//初始坐标
			x : ballRadius,
			y : ballRadius,

			//现代移动区域
			minX : ballRadius,
			minY : ballRadius,
			maxX : canvas.width-ballRadius,
			maxY : canvas.height-ballRadius,
			
			// 必须使用模板提供的 getNewSpeed 来取得新的速度
			speedX : getNewSpeed(),
			speedY : getNewSpeed(),
			
			update : function(deltaTime){
				this.x=this.x+this.speedX*deltaTime;
				this.y=this.y+this.speedY*deltaTime;

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
function testCore(deltaTime){
	context.fillStyle = bgColor;
	context.fillRect(0,0,canvas.width,canvas.height);
	context.drawImage(ImgCache["text"],5,50);
	context.drawImage(ImgCache["logo"],225,30);

	for (var i=0;i<ballNum;i++){
		var ball=ballList[i];
		ball.update(deltaTime);
		
		//
		context.beginPath();
		context.arc(ball.x, ball.y, ballRadius,0, 2*Math.PI,false);
		context.fillStyle=ballColor;
		context.fill();
		context.stroke();
		context.closePath();
		context.drawImage(ball.img, ball.x-iconRadius, ball.y-iconRadius );
	}	
}

