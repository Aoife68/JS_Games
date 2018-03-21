var vCanvas;
var vContext;

var ballX = 5;
var ballY = 5;
var xAxis = 0;
var yAxis = 0;
var ballRadius = 10;

var ballSpeedX = 15;
var ballSpeedY = 5;

var paddleLeftY = 250;
var paddleRightY = 250;
const PADDLE_HEIGHT = 80;
const PADDLE_WIDTH = 10;

var player1Score = 0;
var player2Score = 0;

/******************************Mouse Positions and Control*****************************/
function calculateMousePosition(evt){
	var rect = vCanvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return{
		x:mouseX,
		y:mouseY
	};
}


//Onload draw paddles and and ball and set ball speed and interval 
/*********************************On loading page******************************/
window.onload = function(){
	vCanvas = document.getElementById('gameCanvas');
	vContext = vCanvas.getContext('2d');
		
	var framesPerSecond = 20;
	setInterval(draw, 1000/framesPerSecond);
	
	vCanvas.addEventListener('mousemove', 
		function(evt){
			var mousePosition = calculateMousePosition(evt);
			paddleLeftY = mousePosition.y - (PADDLE_HEIGHT/2);//To align mouse in centre of paddle
		}
	);
	
}
/**************************************Draw Everything******************************************/

function draw(){
	vContext.fillStyle ='black';
	vContext.fillRect(xAxis,yAxis,vCanvas.width,vCanvas.height);
	drawBall(ballX,ballY,ballRadius, 'red');
	drawPaddleLeft(xAxis,paddleLeftY,PADDLE_WIDTH,PADDLE_HEIGHT, 'white');
	drawPaddleRight((vCanvas.width - PADDLE_WIDTH),paddleRightY,PADDLE_WIDTH,PADDLE_HEIGHT,'white');
	automatedRightPaddle();
	vContext.fillText("Player 1 Score " + player1Score, 10, 30);
	vContext.fillText("Player 2 Score " + player2Score, vCanvas.width - 100, 30);
}

/************************************Ball**********************************************/

function drawBall(centreX, centreY, ballRadius, drawColor){
	vContext.beginPath();
	vContext.fillStyle = drawColor;
	vContext.arc(centreX, centreY, ballRadius, 0, Math.PI*2, true);
	vContext.fill();
	//vContext.fillRect(ballX,ballY,xAxis,yAxis);
	vContext.closePath();
	ballDirection();
}

//Set the direction of the ball
function ballDirection(){
	ballX = ballX + ballSpeedX;
	ballY = ballY + ballSpeedY;
	
	//controls direction of ball on X Axis
	if(ballX > (vCanvas.width - ballRadius)){
	   ballSpeedX = - ballSpeedX;	
	}
	if(ballX < 0){
		if(ballY > paddleLeftY && ballY < paddleLeftY + PADDLE_HEIGHT){
			ballSpeedX = - ballSpeedX;
		}
		else {
			ballReset();
			player2Score += 2;
			console.log("Player 2: " + player2Score);
		}
			
	} 
	//controls direction of ball on Y Axis
	if(ballY > vCanvas.height - ballRadius){
	   ballSpeedY = - ballSpeedY;	
	}
	if(ballY < ballRadius){
	   ballSpeedY = - ballSpeedY;	
	}
	
	if(ballX > vCanvas.width){
		if(ballY > paddleRightY && ballY < paddleRightY + PADDLE_HEIGHT){
			 ballSpeedY = - ballSpeedY;	
		}
		else{
			ballReset();
			player1Score += 2;
			console.log("Player 1: " + player1Score);
		}
	}
}

//Rest the ball direction to serve in centre
function ballReset(){
	ballSpeedX = - ballSpeedX;//changes ball direction on serve
	ballX = vCanvas.width/2; 
	ballY = vCanvas.height/2;
}

/******************************************Paddle*****************************/

function drawPaddleLeft(leftX, topY, width, height, drawColor){
	
	vContext.fillStyle = drawColor;
	vContext.fillRect(leftX,topY,width,height);
	
}

function drawPaddleRight(leftX, topY, width, height, drawColor){
	vContext.fillStyle = drawColor;
	vContext.fillRect(leftX,topY,width,height);
	
}

function automatedRightPaddle(){
	var paddleRightYCentre = paddleRightY + (PADDLE_HEIGHT/2);
	if(paddleRightYCentre < ballY - 35){
		paddleRightY = paddleRightY + 6;
	}
	else if(paddleRightYCentre > ballY + 35){
		paddleRightY = paddleRightY - 6;
	}
}