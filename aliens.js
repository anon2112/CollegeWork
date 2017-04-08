var SIZE = 100;
var ROWS = 6;
var COLS = 7;

var canvas = document.querySelector("canvas");
canvas.width = 600;
canvas.height = 700;

var surface = canvas.getContext("2d");
var arr = [];

var playerX;
var playerY;

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

for (var row = 0; row < ROWS; row++){ 
	var tempTile = {}; 
	tempTile.x = row * SIZE; 
	tempTile.y = 0; 
	if(row % 2)
	{
		tempTile.img = meteor; //assigns the image meteor to tempTile object
	
	}
	else
	{
		tempTile.img = space; 
	}
	arr[row] = tempTile; // Assigns the temporary object to the array at col
}

setInterval(update, 30);

update();

function update()
{
	moveTiles(); // Moving the tiles.
	render();	// Rendering out the tile images to the canvas.
	setTimeout(function(){requestAnimationFrame(update);}, 30);
}

function moveTiles()
{
	for(var row = 0; row < ROWS; row++) // Run for 10 cols.
	{
		arr[row].y += 10; // Delta y (change in y by 3 pixels down)
		console.log("row is:  " + row);
		console.log("arr[row].y is:  " + arr[row].y);
	}

	if(arr[0].row <= 700)
	{
		var tempTile = {}; // Creating object with a temporary name.
		tempTile.x = 600;
		tempTile.y = 100;
		tempTile.img = meteor; //assigns rocks
		arr.push(tempTile); // Adds tile to end of col.
		arr.shift(); // Removes the first column.
	}
	


}

function render() 
{

	surface.clearRect(0,0,canvas.width, canvas.height); // Clears the canvas.
	for (var row = 0; row < ROWS; row++){ 

		surface.drawImage(arr[row].img, arr[row].x, arr[row].y); // draw content of all cols in the canvas

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


