
//let timeout;
let counter = 0;
let timeout;
let timer_on = 0;

/* Define Canvas */

var canvas;
var stage;
var context;


// Graphics
//[Background]

var bgImg = new Image();
var bg;

//[Title View]
 
var mainImg = new Image();
var main;
var startBImg = new Image();
var startB;
var creditsBImg = new Image();
var creditsB;

//[Title View Group]

var TitleView = new Container();

//[Credits]

var creditsViewImg = new Image();
var credits;

//[Game View]

var playerImg = new Image();
var player;
var ballImg = new Image();
var ball;
var cpuImg = new Image();
var cpu;
var winImg = new Image();
var win;
var loseImg = new Image();
var lose;
var timeupImg = new Image();
var timeup;

//[Score]

var playerScore;
var cpuScore;
var timer;
var time;

// Variables

var xSpeed = 5;
var ySpeed = 5;
var gfxLoaded = 0;
var tkr = new Object;

console.log("main func");


// Main Function

function Main()
{

	
	console.log("main func");

	/* Link Canvas */
	
	canvas = document.getElementById('Pong');

var ctx = canvas.getContext('2d');
window.addEventListener('resize', function() {
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
});

console.log(canvas.width);

// 	context = canvas.getContext(‘webgl’);
// 	console.log(WebGLRenderingContext.isContextLost());
// context.canvas.width = window.innerWidth;
// context.canvas.height = window.innerHeight;



  	stage = new Stage(canvas);
	//   console.log(window.canvas.offsetWidth);
	//   console.log(window.canvas.offsetHeight);

	  
	// 	console.log(window.innerHeight);
	// 	console.log(window.innerWidth);

  	stage.mouseEventsEnabled = true;
  	
  	/* Sound */

	SoundJS.addBatch([
		{name:'hit', src:'hit.mp3', instances:1},
		{name:'playerScore', src:'playerScore.mp3', instances:1},
		{name:'enemyScore', src:'enemyScore.mp3', instances:1},
		{name:'wall', src:'wall.mp3', instances:1}]);
  		
  	/* Load GFX */
  		
  	bgImg.src = 'bg.png';
  	bgImg.name = 'bg';
  	bgImg.onload = loadGfx;
  	
  	mainImg.src = 'main.png';
  	mainImg.name = 'main';
  	mainImg.onload = loadGfx;
	
	startBImg.src = 'startB.png';
	startBImg.name = 'startB';
	startBImg.onload = loadGfx;
	
	creditsBImg.src = 'creditsB.png';
	creditsBImg.name = 'creditsB';
	creditsBImg.onload = loadGfx;
	
	creditsViewImg.src = 'credits.png';
	creditsViewImg.name = 'credits';
	creditsViewImg.onload = loadGfx;
	
	playerImg.src = 'paddle.png';
	playerImg.name = 'player';
	playerImg.onload = loadGfx;
	
	ballImg.src = 'ball.png';
	ballImg.name = 'ball';
	ballImg.onload = loadGfx;
	
	cpuImg.src = 'paddle.png';
	cpuImg.name = 'cpu';
	cpuImg.onload = loadGfx;
	
	winImg.src = 'win.png';
	winImg.name = 'win';
	winImg.onload = loadGfx;
	
	loseImg.src = 'lose.png';
	loseImg.name = 'lose';
	loseImg.onload = loadGfx;

	timeupImg.src = 'output-onlinepngtools.png';
	timeupImg.name = 'timeup';
	timeupImg.onload = loadGfx;
	
	/* Ticker */
	
	Ticker.setFPS(30);
	Ticker.addListener(stage);

}

function loadGfx(e)
{
	if(e.target.name = 'bg'){bg = new Bitmap(bgImg);}
	if(e.target.name = 'main'){main = new Bitmap(mainImg);}
	if(e.target.name = 'startB'){startB = new Bitmap(startBImg);}
	if(e.target.name = 'creditsB'){creditsB = new Bitmap(creditsBImg);}
	if(e.target.name = 'credits'){credits = new Bitmap(creditsViewImg);}
	if(e.target.name = 'player'){player = new Bitmap(playerImg);}
	if(e.target.name = 'ball'){ball = new Bitmap(ballImg);}
	if(e.target.name = 'cpu'){cpu = new Bitmap(cpuImg);}
	if(e.target.name = 'win'){win = new Bitmap(winImg);}
	if(e.target.name = 'lose'){lose = new Bitmap(loseImg);}
	if(e.target.name = 'timeup'){timeup = new Bitmap(timeupImg);}
	
	gfxLoaded++;
	
	if(gfxLoaded == 11)
	{
		addTitleView();
	}
}

// Add Title View Function

function addTitleView()
{
	startB.x = 240 - 31.5;
	startB.y = 160;
	startB.name = 'startB';
	
	creditsB.x = 241 - 42;
	creditsB.y = 200;
	
	TitleView.addChild(main, startB, creditsB);
	stage.addChild(bg, TitleView);
	stage.update();
	
	// Button Listeners
	
	startB.onPress = tweenTitleView;
	creditsB.onPress = showCredits;
	console.log("add title func");
}

function showCredits()
{
	// Show Credits
		
	credits.x = 480;
		
	stage.addChild(credits);
	stage.update();
	Tween.get(credits).to({x:0}, 300);
	credits.onPress = hideCredits;

	console.log("show cred func");
}

// Hide Credits

function hideCredits(e)
{
	Tween.get(credits).to({x:480}, 300).call(rmvCredits);
	console.log("hide cred func");
}

// Remove Credits

function rmvCredits()
{
	stage.removeChild(credits);
}

// Tween Title View

function tweenTitleView()
{		
	// Start Game
		
	Tween.get(TitleView).to({y:-320}, 300).call(addGameView);
}

// Add Game View

function addGameView()
{
	// Destroy Menu & Credits screen
	
	stage.removeChild(TitleView);
	TitleView = null;
	credits = null;
	
	// Add Game View
	
	player.x = 2;
	player.y = 160 - 37.5;
	cpu.x = 480 - 25;
	cpu.y = 160 - 37.5;
	ball.x = 240 - 15;
	ball.y = 160 - 15;
	
	// Score
	
	playerScore = new Text('0', 'bold 20px Arial', '#A3FF24');
	playerScore.maxWidth = 1000;	//fix for Chrome 17
	playerScore.x = 211;
	playerScore.y = 20;
	
	cpuScore = new Text('0', 'bold 20px Arial', '#A3FF24');
	cpuScore.maxWidth = 1000;	//fix for Chrome 17
	cpuScore.x = 262;
	cpuScore.y = 20;

	timer = new Text('Timer:', 'bold 20px Arial', '#A3FF24');
	timer.maxWidth = 1000;	//fix for Chrome 17
	timer.x = 50;
	timer.y = 20;

	time = new Text('60', 'bold 20px Arial', '#A3FF24');
	time.maxWidth = 1000;	//fix for Chrome 17
	time.x = 120;
	time.y = 20;
	
	stage.addChild(playerScore, cpuScore, timer, time, player, cpu, ball);
	stage.update();
	
	// Start Listener 
	
	bg.onPress = startGame;
	console.log("start press func");
}

// Player Movement

// Player Movement

function selectPaddle(e)
{
	stage.onMouseMove = movePaddle;
	console.log("select");
}
function movePaddle(e)
{
	// Mouse Movement
	
	player.y = e.stageY;
	console.log("move");
	stage.onMouseUp= stopPaddle;
}

function stopPaddle(e)
{	
	player.y = player.y ;

	stage.onMouseMove = null;

	console.log("stop");

}

// Start Game Function


function startGame(e)
{

	document.addEventListener("touchstart", touch2Mouse, true);
document.addEventListener("touchmove", touch2Mouse, true);
document.addEventListener("touchend", touch2Mouse, true);

	bg.onPress = null;
	stage.onMouseDown = selectPaddle;
	
	Ticker.addListener(tkr, false);
	tkr.tick = update;    console.log("start game func");


}

function touch2Mouse(e)
{
  var theTouch = e.changedTouches[0];
  var mouseEv;

  switch(e.type)
  {
    case "touchstart": mouseEv="mousedown"; break;  
    case "touchend":   mouseEv="mouseup"; break;
    case "touchmove":  mouseEv="mousemove"; break;
    default: return;
  }

  var mouseEvent = document.createEvent("MouseEvent");
  mouseEvent.initMouseEvent(mouseEv, true, true, window, 1, theTouch.screenX, theTouch.screenY, theTouch.clientX, theTouch.clientY, false, false, false, false, 0, null);
  theTouch.target.dispatchEvent(mouseEvent);

  e.preventDefault();
}

/* Reset */

function reset()
{
	ball.x = 240 - 15;
	ball.y = 160 - 15;
	player.y = 160 - 37.5;
	cpu.y = 160 - 37.5;
	
	stage.onMouseMove = null;
	Ticker.removeListener(tkr);
	bg.onPress = startGame;
}

// Update Function


function update()
{
	// Ball Movement 

	ball.x = ball.x + xSpeed;
	ball.y = ball.y + ySpeed;
	
	// Cpu Movement
	
	if(cpu.y < ball.y) {
		cpu.y = cpu.y + 2.5;
	}
	else if(cpu.y > ball.y) {
		cpu.y = cpu.y - 2.5;
	}
	
	// Wall Collision 

	if((ball.y) < 0) { ySpeed = -ySpeed; SoundJS.play('wall');};//Up
	if((ball.y + (30)) > 320) { ySpeed = -ySpeed; SoundJS.play('wall');};//down
	


	  if (!timer_on) {
    timer_on = 1;
    timedCount();
  } 

	/* CPU Score */
	
	if((ball.x) < 0)
	{
		xSpeed = -xSpeed;
		cpuScore.text = parseInt(cpuScore.text + 1);
		reset();
		SoundJS.play('enemyScore');
	}
	
	/* Player Score */
	
	if((ball.x + (30)) > 480)
	{
		xSpeed = -xSpeed;
		playerScore.text = parseInt(playerScore.text + 1);
		reset();
		SoundJS.play('playerScore');
	}
	
	/* Cpu collision */
	
	if(ball.x + 30 > cpu.x && ball.x + 30 < cpu.x + 22 && ball.y >= cpu.y && ball.y < cpu.y + 75)
	{
		xSpeed *= -1;
		SoundJS.play('hit');
	}
	
	/* Player collision */
	
	if(ball.x <= player.x + 22 && ball.x > player.x && ball.y >= player.y && ball.y < player.y + 75)
	{
		xSpeed *= -1;
		SoundJS.play('hit');
	}
	
	/* Stop Paddle from going out of canvas */
	
	if(player.y >= 249)
	{
		player.y = 249;
	}
	
	/* Check for Win */
	
	if(playerScore.text == '10')
	{
		alert('win');

	}
	
	/* Check for Game Over */
	
	if(cpuScore.text == '10')
	{
		alert('lose');

	}


}





function timedCount() {
  
   if ( parseInt(time.text) > 0) {time.text = parseInt(time.text - 1);}
  else{ 
	
	clearTimeout(timeout);
	alert('timeup');

	parseInt(time.text)=60; 		//to avoid loop of timeout
	
	reset();
	timer_on = 0;
 
	//console.log("loop");

}
  timeout = setTimeout(timedCount, 1000);
}

function stopCount() {

}


function alert(e)
{
	Ticker.removeListener(tkr);
	stage.onMouseMove = null;
	bg.onPress = null
	
	if(e == 'win')
	{
		win.x = 140;
		win.y = -90;
	
		stage.addChild(win);
		Tween.get(win).to({y: 115}, 300);
	}
	else if(e == 'timeup')
	{
		timeup.x = 140;
		timeup.y = -90;
	
		stage.addChild(timeup);
		Tween.get(timeup).to({y: 115}, 300);
		
		
	}
	else if(e == 'lose')
	{
		lose.x = 140;
		lose.y = -90;
	
		stage.addChild(lose);
		Tween.get(lose).to({y: 115}, 300);
	}
}
