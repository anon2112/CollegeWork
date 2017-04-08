var SIZE = 100;
var ROWS = 6;
var COLS = 7;

var canvas = document.querySelector("canvas");
canvas.width = 600;
canvas.height = 700;

var surface = canvas.getContext("2d");
var arr = [];

var myPara = document.querySelector("myPara");
var score = 0;

var meteor = new Image();
meteor.src = "img/meteor.png";
var space = new Image();
space.src = "img/outerspace.png";
var player = new Image();
player.src = "img/player.png";
var alien = new Image();
alien.src = "img/alien.png";
var explosion = new Image();
explosion.src = "img/explosion";
var missile = new Image();
explosion.src = "img/missile.png";

var playerX;
var playerY;
var alienX;
var alienY;

for (var row = 0; row < ROWS; row++){ 
	var tempTile = {}; 
	tempTile.x = row * SIZE; 
	tempTile.y = 0; 
	if(row % 2)
	{
		tempTile.img = meteor; 
	
	}
	else
	{
		tempTile.img = space; 
	}
	arr[row] = tempTile;
}

setInterval(update, 30);

update();

function update()
{
	moveTiles();
	render();
	setTimeout(function(){requestAnimationFrame(update);}, 30);
}

function moveTiles()
{
	for(var row = 0; row < ROWS; row++)
	{
		arr[row].y += 10;
		console.log("row is:  " + row);
		console.log("arr[row].y is:  " + arr[row].y);
	}

	if(arr[0].row <= 700)
	{
		var tempTile = {};
		tempTile.x = 600;
		tempTile.y = 100;
		tempTile.img = meteor;
		arr.push(tempTile);
		arr.shift();
	}
	


}

function render() 
{

	surface.clearRect(0,0,canvas.width, canvas.height);
	for (var row = 0; row < ROWS; row++){ 

		surface.drawImage(arr[row].img, arr[row].x, arr[row].y);

	}
}

function score()
{
	if (score > 0)
	{
	myPara.innerHTML = "Score: ";
	myPara.innerHTML = score * 10;
	}
}


