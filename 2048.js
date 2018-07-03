//import has from 'lodash/has';

var list = document.querySelectorAll (".square");
var scoreDisplay = document.querySelector("#score");
var bestScoreDisplay = document.querySelector("#best_score");
var resetButton = document.querySelector("#reset");
var title = document.querySelector("h1");


var lost = false;
var grid = [];
var score = 0;
var bestScore = 0;

initialise();


window.addEventListener("keydown", function (e) {
	if (e.keyCode === 37) {
		var oldGrid = JSON.parse(JSON.stringify(grid));
		left();
		if (hasChanged(oldGrid, grid)) {
			
			generateInteger();
		}
		update();
	}
});

window.addEventListener("keydown", function (e) {
	if (e.keyCode === 38) {
		var oldGrid = JSON.parse(JSON.stringify(grid));
		up();
		if (hasChanged(oldGrid, grid)) {
			generateInteger();
		}
		update();
	}
});

window.addEventListener("keydown", function (e) {
	if (e.keyCode === 39) {
		var oldGrid = JSON.parse(JSON.stringify(grid));
		right();
		if (hasChanged(oldGrid, grid)) {
			generateInteger();
		}
		update();
	}
});

window.addEventListener("keydown", function (e) {
	if (e.keyCode === 40) {
		var oldGrid = JSON.parse(JSON.stringify(grid));
		down();
		if (hasChanged(oldGrid, grid)) {
			generateInteger();
		}
		update();
	}
});

resetButton.addEventListener("click", function(){
	initialise();
});
	















function initialise()
{
	score = 0;
	for (var i = 0; i < list.length ; i++)
	{
		list[i].textContent = 0;
	}

	buildGrid();
	generateInteger();
	update();
}


function buildGrid () 
{
	var j = 0;
	for (var i  = 0; i < 4; i++) {
		grid[i] = [list[j].textContent, list[j+1].textContent, list[j+2].textContent, list[j+3].textContent];
		j += 4;
	}
}




function right()
{
	shiftRight();
	for (var i = 0; i < 4; i++){
		for (var j = 3; j > 0 ; j--) {
			if (grid[i][j] == grid[i][j-1]){
				grid[i][j] *= 2;
				grid[i][j-1] = 0;
				score += grid[i][j];
			}
		}
	}
	shiftRight();
}

function down()
{
	shiftDown();
	for (var j = 0; j < 4; j++){
		for (var i = 3; i > 0 ; i--) {
			if (grid[i][j] == grid[i-1][j]){
				grid[i][j] *= 2;
				grid[i-1][j] = 0;
				score += grid[i][j];
			}
		}
	}
	shiftDown();
}

function left()
{
	shiftLeft();
	for (var i = 0; i < 4; i++){
		for (var j = 0; j < 3 ; j++) {
			if (grid[i][j] == grid[i][j+1]){
				grid[i][j] *= 2;
				grid[i][j+1] = 0;
				score += grid[i][j];
			}
		}
	}
	shiftLeft();
}

function up()
{
	shiftUp();
	for (var j = 0; j < 4; j++){
		for (var i = 0; i < 3 ; i++) {
			if (grid[i][j] == grid[i+1][j]){
				grid[i][j] *= 2;
				grid[i+1][j] = 0;
				score += grid[i][j];
			}
		}
	}
	shiftUp();
}



function shiftRight()
{
	for (var i = 0; i < 4; i++)
	{
		var j = 3;
		while (j > 0)
		{
			if (grid[i][j] == 0 && grid[i][j-1] != 0)
			{
				grid[i][j] = grid[i][j-1];
				grid[i][j-1] = 0;
				j = 4;
			}
			j--;
		}
	}
}

function shiftDown()
{
	for (var j = 0; j < 4; j++)
	{
		var i = 3;
		while (i > 0)
		{
			if (grid[i][j] == 0 && grid[i-1][j] != 0)
			{
				grid[i][j] = grid[i-1][j];
				grid[i-1][j] = 0;
				i = 4;
			}
			i--;
		}
	}
}

function shiftLeft()
{
	for (var i = 0; i < 4; i++)
	{
		var j = 0;
		while (j < 3)
		{
			if (grid[i][j] == 0 && grid[i][j+1] != 0)
			{
				grid[i][j] = grid[i][j+1];
				grid[i][j+1] = 0;
				j = -1;
			}
			j++;
		}
	}
}

function shiftUp()
{
	for (var j = 0; j < 4; j++)
	{
		var i = 0;
		while (i < 3)
		{
			if (grid[i][j] == 0 && grid[i+1][j] != 0)
			{
				grid[i][j] = grid[i+1][j];
				grid[i+1][j] = 0;
				i = -1;
			}
			i++;
		}
	}
}



function update ()
{
	var k = 0;
	for (var i = 0; i < 4; i++){
		for (var j = 0; j < 4 ; j++){
			list[k].textContent = grid[i][j];
			if (list[k].textContent == 0) {
				//list[k].classList.add("zero");
				list[k].style.background = "#dddddd";
				list[k].style.color = "#dddddd";
			}
			else if(list[k].textContent == 2){
				//list[k].classList.add("two");
				list[k].style.background = "#F7F6E7";
				list[k].style.color = "#777777";

			}
			else if (list[k].textContent == 4) {
				//list[k].classList.add("four");
				list[k].style.background = "#ECE9D3";
				list[k].style.color = "#777777";
			}
			else if (list[k].textContent == 8) {
				//list[k].classList.add("eight");
				list[k].style.background = "#FFAE84";
				list[k].style.color = "#FFFFFF";
			}
			else if (list[k].textContent == 16) {
				//list[k].classList.add("one-six");
				list[k].style.background = "#FF9966";
				list[k].style.color = "#FFFFFF";
			}
			else if (list[k].textContent == 32) {
				//list[k].classList.add("three-two");
				list[k].style.background = "#FFA998";
				list[k].style.color = "#FFFFFF";
			}
			else if (list[k].textContent == 64) {
				//list[k].classList.add("six-four");
				list[k].style.background = "#FF6F52";
				list[k].style.color = "#FFFFFF";
			}
			else if (list[k].textContent == 128) {
				//list[k].classList.add("one-two-eight");
				list[k].style.background = "#FFE98D";
				list[k].style.color = "#FFFFFF";
			}
			else if (list[k].textContent == 256) {
				//list[k].classList.add("two-five-six");
				list[k].style.background = "#FFE475";
				list[k].style.color = "#FFFFFF";
			}
			else if (list[k].textContent == 512) {
				//list[k].classList.add("five-one-two");
				list[k].style.background = "#FFE269";
				list[k].style.color = "#FFFFFF";
			}
			else if (list[k].textContent == 1024) {
				//list[k].classList.add("one-zero-two-four");
				list[k].style.background = "#FFE062";
				list[k].style.color = "#FFFFFF";
			}
			else if (list[k].textContent == 2048) {
				//list[k].classList.add("two-zero-four-eight");
				list[k].style.background = "#F9F2E0";
				list[k].style.color = "#FFFFFF";
			}
			else if (list[k].textContent == 4096) {
				//list[k].classList.add("four-zero-nine-six");
				list[k].style.background = "#F9F2E0";
				list[k].style.color = "#FFFFFF";
			}
			k++;
		}
	}
	scoreDisplay.textContent = score; 
	if (score > bestScore) {
		bestScore = score;
		bestScoreDisplay.textContent = bestScore;
	}
	if (gameOver() == true) {
		title.textContent = "Game Over!";
	}
}


function generateInteger() {
	var emptySlots = [];
	for (var i = 0; i < 4; i++){
		for (var j = 0; j < 4 ; j++){
			if (grid[i][j] == 0){
				var emptyCoordinate = {
					row: i,
					column: j
				};
				emptySlots.push(emptyCoordinate);
			}
		}
	}
	var random = Math.floor(Math.random() * emptySlots.length);
	grid[emptySlots[random].row][emptySlots[random].column] = randomWithProbability();
}


function randomWithProbability() {
  var notRandomNumbers = [4, 2, 2, 2, 2, 2, 2, 2, 2, 2];
  var idx = Math.floor(Math.random() * notRandomNumbers.length);
  return notRandomNumbers[idx];
}



function gameOver () {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (grid[i][j] == 0){
				return false;
			} 
		}
	}
	return true;
}


function hasChanged(old, neww) {
	
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (old[i][j] != neww[i][j]){
				return true;
			}
		}
	}
	return false;
}


















