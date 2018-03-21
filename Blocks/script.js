var vCanvas = document.getElementById('canvasID');
var vContext = vCanvas.getContext('2d');
var x= vCanvas.width/2;
var y = vCanvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (vCanvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 80;
var brickHeight = 20;
var brickPadding = 5;
var brickOffSetTop = 30;
var brickOffSetLeft = 30;

//initialising bricks
var bricks =[];
for(c = 0; c < brickColumnCount; c++){
	bricks[c] = [];/**Create another array**/
	for(r = 0; r < brickRowCount; r++){
		bricks[c][r] = {x:0, y:0, status: 1}
	}
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

/**Function to draw the bricks**/
function drawBricks(){
	for(c = 0; c < brickColumnCount; c++){
		
		for(r = 0; r < brickRowCount; r++){
			if(bricks[c][r].status == 1){
				var brickX = (c*(brickWidth + brickPadding))+brickOffSetLeft;/**Calculate the X co-ordinates of the brick positions*/
				var brickY = (r*(brickHeight + brickPadding))+brickOffSetTop;/**Calculate the Y co-ordinates of the brick positions*/
				bricks[c][r].x = brickX;/**Set the X and Y co-ordinates of the brick positions*/
				bricks[c][r].y = brickY;
				vContext.beginPath();
				vContext.rect(brickX,brickY, brickWidth, brickHeight);
				vContext.fillStyle = "blue";
				vContext.fill();
				vContext.closePath();	
			}
		}
	}	
}

/******************************************
// functions to deal with event handlers
// keyCode 39 = right
//keyCode 37 = left
******************************************/
function keyDownHandler(e){/**Event for pressing key on keyboard**/
	if(e.keyCode == 39){
		rightPressed = true;	
	}
	else if(e.keyCode == 37){
		leftPressed = true;
	}
}

function keyUpHandler(e){/**Event for releasing key on keyboard**/
	if(e.keyCode == 39){
		rightPressed = false;	
	}
	else if(e.keyCode == 37){
		leftPressed = false;
	}
}


/**Draw the ball**/
function drawBall(){
	vContext.beginPath();
	vContext.arc(x, y, ballRadius, 0, Math.PI*2);
	vContext.fillStyle = "blue";
	vContext.fill();
	vContext.closePath();
}

/**Draw the paddle**/
/**The rect takes four parameters, the first parameter is X axis, second is Y axis the last two are paddle height and width**/
function drawPaddle(){
	vContext.beginPath();
	vContext.rect(paddleX, vCanvas.height - paddleHeight, paddleWidth, paddleHeight);
	vContext.fillStyle = "blue";
	vContext.fill();
	vContext.closePath();
}

/**Function to detect collision with Bricks**/
function brickCollisionDetection(){
	for(c = 0; c < brickColumnCount; c++){
		for(r = 0; r < brickRowCount; r++){
			var vBrick = bricks[c][r];
			if(vBrick.status == 1){
				//calculations
				if(x > vBrick.x && x < vBrick.x+brickWidth && y > vBrick.y && y < vBrick.y + brickHeight ){/**Change direction if ball hits brick**/
					dy = -dy; 
					vBrick.status = 0;					
				}	
			}
			
		}
	}
	
}

/**Draw function will draw the properties in the canvas and control the movement of the ball and paddle**/
function draw(){
	vContext.clearRect(0,0,vCanvas.width,vCanvas.height );
	drawBall();
	drawPaddle();
	drawBricks();
	brickCollisionDetection();
	
	//if drawing goes beyond boundary of canvas, in either x or y axis, then change it's direction
	//y + dy is refering to the centre of the ball
	//to prevent it sinking into the wall of the canvas we use it's circumfrance
	if(y + dy < ballRadius){ /**if ball touches top of canvas change direction of ball**/
		dy = -dy;
	}
	else if(y + dy > vCanvas.height - ballRadius){/**if ball touches bottom of canvas, two possible scenarios**/
		if(x > paddleX && x < paddleX + paddleWidth){/**if ball touches paddle change direction**/
				dy = -dy;
		}
		else{/**if ball doesn't touch paddle game over and reload page(URL)**/
			alert("GAME OVER");
			/**the location object returns information about the URL of the document**/
			document.location.reload();	
		}
		
	}
	
	if(x + dx < ballRadius || x + dx > vCanvas.width - ballRadius){
		dx = -dx;
	}
	
	//Controls the movement of the paddle
	if(rightPressed && paddleX < vCanvas.width - paddleWidth){/**if right key pressed and within canvas boundaries move paddle 7 pixels**/
		paddleX +=7;		
	}
	else if(leftPressed && paddleX > 0){/**if left key pressed and within canvas boundaries move paddle 7 pixels**/
		paddleX -=7;
	}
		
	x += dx;
	y += dy;
	
}

//setInterval(function, milliseconds);
setInterval(draw, 10);