var _stage = document.getElementById("stage");
var _canvas = document.querySelector("canvas");
var surface = _canvas.getContext("2d"); // d is lowercase!

const ROWS = 7;
const COLS = 6;
const SIZE = 100;
const SCROLL = 5;

_canvas.width = COLS*SIZE;
_canvas.height = ROWS*SIZE;

var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var downPressed = false;

var map = []; // = new Array(ROWS);
var player = {x:SIZE*2, y:SIZE*3, speed:10, 
              dX:0, dY:0, image:null};
var uIval = setInterval(update, 33.34); // 30fps

initGame();

function initGame()
{
	var pImage = new Image();
	pImage.src = "../img/Ship.png";
	var dead = new Image();
	dead.src = "../img/explosion.png";
	player.image = pImage;
	var asteroid = new Image();
	asteroid.src = "../img/Asteroids.png";
	
	generateMap();
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
}

function generateMap()
{
	for (var row = 0; row < ROWS+1; row++)
	{
		map[row] = []; //new array
		for (var col = 0; col < COLS; col++)
		{
			var tempTile = { x:col*SIZE, y:row*SIZE, image:null, collision:false};
			tempTile.image = new Image();// Temp line.
			tempTile.image.src = "../img/Blank.png";
			map[col][row] = tempTile;
		}
	}
}

function scrollMap()
{
	for (var row = 0; row < map.length; row++)
	{
		for (var col = 0; col < map[0].length; col++)
		{
			map[row][col].y += SCROLL;
		}
	}
	if (map[map.length-1][map[0].length-1].y >= _canvas.height)
	{
		var tempRow = [];
		map.pop();
		
		for (var col = 0; col < map[0].length; col++)
		{
			var tempTile = { x:col*SIZE, y: -100, image:null, collision: false };
			tempTile.image = new Image();// Temp line.
			tempTile.image.src = "../img/Asteroids.png";
			tempRow.push(tempTile);
		}
		map.unshift(tempRow);
	}
}

function onKeyDown(event)
{
	switch(event.keyCode)
	{
		case 37: // Left.
				if ( leftPressed == false )
					leftPressed = true;
				break;
		case 39: // Right.
				if ( rightPressed == false )
					rightPressed = true;
				break;
		case 38: // Up.
				if ( upPressed == false )
					upPressed = true;
				break;
		case 40: // Down.
				if ( downPressed == false )
				downPressed = true;
				break;
		default:
				console.log("Unhandled key.");
				break;
	}
}

function onKeyUp(event)
{
	switch(event.keyCode)
	{
		case 37: // Left.
				leftPressed = false;
				break;
		case 39: // Right.
				rightPressed = false;
				break;
		case 38: // Up.
				upPressed = false;
				break;
		case 40: // Down.
				downPressed = false;
				break;
		default:
				console.log("Unhandled key.");
				break;
	}
}

function update() // Going to run 30fps
{
	movePlayer();
	scrollMap();
	collision();
	render();
}

function movePlayer()
{
	if ( leftPressed == true && player.x > SIZE/2 ) 
		player.x -= player.speed; 
	if ( rightPressed == true && player.x < 600 - SIZE/2 )
		player.x += player.speed;
	if ( upPressed == true && player.y > SIZE/2)
		player.y -= player.speed;
	if ( downPressed == true && player.y < 700 - SIZE/2)
		player.y += player.speed;
}

function collision()
{
	for(var row=0; row < map.length; row++)
	{
		for (var col=0; col < map[row].length; col++)
		{
			// Checks x coordinate
			if(((player.x + 60) >= (map[row][col].x + SIZE/6 - 5) || (player.x + 5) >= (map[row][col].x + SIZE/6 - 10)) && (player.x + 5) <= (map[row][col].x + SIZE/2 + 10))
			{// Checks y coordinate
				if(((player.y + 5) >= (map[row][col].y + SIZE/6) && (player.y + 5) <= (map[row][col].y + SIZE/2 + 15)) || ((player.y + 88) >= (map[row][col].y + SIZE/6) && (player.y + 88) <= (map[row][col].y + SIZE/2 + 15)))
				{
					player.image = player.dead;
					clearInterval(updateInterval);
					window.alert("Game Over!"); 
					// GAME OVER MESSAGE 
				}
			}
		}
	}
}

function render()
{
	surface.clearRect(0, 0, _canvas.width, _canvas.height); // x, y, w, h
	// Renders the map
	for (var row = 0; row < map.length; row++)
	{
		for (var col = 0; col < map[0].length; col++)
		{
			if (map[row][col].image != null)
				surface.drawImage(map[row][col].image,
								  map[row][col].x,
								  map[row][col].y);
		}
	}
	// Render player...
	surface.drawImage(player.image,player.x-SIZE/2,player.y-SIZE/2);
}












