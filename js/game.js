var canvas = document.getElementById('canvas');

if (!canvas) {
    alert("Could not find canvas! Maybe game.js might have been moved in the html file. It should be loaded after all the HTML markup, not before.");
}

if (!canvas.getContext) {
    alert("Browser not HTML5 compliant. Could not load Connect 4 game!");
}

if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

    // call setup
    setup();

    // requestAnimationFrame defined for fallback on various browsers that may not support
    // window.requestAnimationFrame(callback)
    var requestAnimationFrame =
	window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	function(callback) {
            return setTimeout(callback, 1);
	};

    // ChipPiece prototype (JS verison of classes)
    function ChipPiece(x, y, endPosition, radius, color) {
	this.x = x;
	this.y = y;
	this.endPosition = endPosition;
	this.radius = radius;
	this.color = color;
    }

    // 2D Array of chips
    var board = [];
    // String version of board
    var stringBoard = [];

    resetGame();

    function resetGame(){
	for (i = 0; i < 6; i++){
	    board[i] = [];
	    for (j = 0; j < 7; j++) {
		board[i][j] = null;
	    }
	}
	resetStringBoard();
    }

    function resetStringBoard() {
	for (i = 0; i < 6; i++){
	    stringBoard[i] = [];
	    for (j = 0; j < 7; j++){
		stringBoard[i][j] = "N";
	    }
	}
    }


    /* ============================================
       ANIMATION
       ========================================= */

    // runs once
    function setup() {
	requestAnimationFrame(draw);
    }

    // runs in a loop
    function draw() {
	// Clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// Yellow board
	ctx.fillStyle = "#ffff00";
	ctx.fillRect(10,10,700,600);
	// Blue bottom
	ctx.strokeRect(5,610,710,25);
	ctx.fillStyle = "#0000ff";
	ctx.fillRect(5,610,710,25);
	ctx.font="50px Georgia";
	// Display whose turn it is
	if(playerOneTurn){
	    ctx.fillText("Red",200,700);
	} else if (playerTwoTurn){
	    ctx.fillText("Black",200,700);
	}

	// Draws vertical lines that separate the columns
	for(i = 10; i <= 710; i+= 100){
	    ctx.beginPath();
	    ctx.moveTo(i, 10);
	    ctx.lineTo(i, 610);
	    ctx.closePath();
	    ctx.stroke();
	}

	// Draws horizontal lines that separate the rows
	for(i = 10; i <= 610; i+= 100){
	    ctx.beginPath();
	    ctx.moveTo(10, i);
	    ctx.lineTo(710, i);
	    ctx.closePath();
	    ctx.stroke();
	}

	// Draws the holes
	ctx.save();
	for (j = 60; j <= 660; j += 100){ // x
	    for (i = 60; i <= 560; i += 100){ // y
		ctx.shadowOffsetX = -1;
		ctx.shadowOffsetY = 1;
		ctx.shadowBlur = 5;
		ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
		ctx.beginPath();
		ctx.arc(j, i, 42, 0, Math.PI*2,false);
		ctx.closePath();
		ctx.stroke();
		ctx.fillStyle = '#ffffff';
		ctx.fill();
	    }
	}
	ctx.restore();

	for (i = 0; i < board.length; i++) {
	    for (j = 0; j < board[i].length; j++) {
	    	if (board[i][j]) {
	    	    animatePiece(board[i][j]);
	    	}
	    }
	}

	// Redraw animation
	requestAnimationFrame(draw);
    }

    // Draws the chip piece
    function animatePiece(chip) {
	ctx.save();

	// draw chip piece
	ctx.beginPath();
	ctx.arc(chip.x, chip.y, chip.radius, 0, Math.PI*2, false);
	ctx.closePath();

	ctx.stroke();

	// add color to chip piece
	ctx.fillStyle = chip.color;
	ctx.fill();

	ctx.restore();

	inc = 5;

	//stop when it reaches certain height
	if (chip.y + inc <= chip.endPosition) {
	    chip.y += inc;
	}
    }

    /* ============================================
       KEY EVENTS
       ========================================= */

    // when a key is pressed, check if number key
    document.body.addEventListener('keydown', function(e) {
	switchTurns(e);
    });

    var startY = 60;
    var chipRadius = 42;
    var playerOneTurn = true;
    var playerTwoTurn = false;

    function switchTurns(e){
	if (e.keyCode >= 49 && e.keyCode <= 55){
	    if (playerOneTurn){
		if (newTurn(e, "red")) {
		    playerOneTurn = false;
		    playerTwoTurn = true;
		}
	    } else if (playerTwoTurn) {
		if (newTurn(e, "black")) {
		    playerOneTurn = true;
		    playerTwoTurn = false;
		}
	    }
	}
    }

    function newTurn(e, player) {
	var column = e.keyCode - 49;
	// checks the rows to see if there are any spots
	for (row = 0; row < 6; row++){
	    if (board[row][column] == null){
		board[row][column] = new ChipPiece(calculateChipColumn(e.keyCode), startY, calculateChipRow(row), chipRadius, player);
		if (player == "red"){
		    stringBoard[row][column] = "R";
		} else if(player == "black"){
		    stringBoard[row][column] = "B";
		}
		checkForWinnerHorizontal(row);
		checkForWinnerVertical(column);
		checkForWinnerDiagonalBackSlash(row,column);
		checkForWinnerDiagonalForwardSlash(row,column);
		return true;
		
	    }
	}
	return false; // returning false means that column is full
    }

    function checkForWinnerHorizontal(row){
	var string = "";
	for(i = 0; i < stringBoard[row].length; i++){
	    string += stringBoard[row][i];
	}
	if (string.includes("RRRR")){
	    console.log("Red wins");
	} else if(string.includes("BBBB")){
	    console.log("Black wins");
	}
    }

    function checkForWinnerVertical(column){
	var string = "";
	for(i = 0; i < stringBoard.length; i++){
	    string += stringBoard[i][column];
	}
	if (string.includes("RRRR")){
	    console.log("Red wins");
	} else if(string.includes("BBBB")){
	    console.log("Black wins");
	}
    }

    function checkForWinnerDiagonalBackSlash(row,column){
	var string = "";
	var counter = row - 1;
	var ccounter = column + 1;
	while(row < 6 && column >= 0){
	    string+= stringBoard[row][column];
	    row++;
	    column--;
	}
	string = string.split("").reverse().join("");
	while(counter >= 0 && ccounter <= 6){
	    string+= stringBoard[counter][ccounter];
	    counter--;
	    ccounter++;
	}
	if (string.includes("RRRR")){
	    console.log("Red wins");
	} else if(string.includes("BBBB")){
	    console.log("Black wins");
	}
    }
    function checkForWinnerDiagonalForwardSlash(row,column){
	var string = "";
	var counter = row - 1;
	var ccounter = column - 1;
	while(row <= 5 && column <= 6){
	    string+= stringBoard[row][column];
	    row++;
	    column++;
	}
	string = string.split("").reverse().join("");
	while(counter >= 0 && ccounter >= 0){
	    string+= stringBoard[counter][ccounter];
	    counter--;
	    ccounter--;
	}
	if (string.includes("RRRR")){
	    console.log("Red wins");
	} else if(string.includes("BBBB")){
	    console.log("Black wins");
	}
    }
    
    // Calculates which column to put it in
    // The result of (keyCode - 48) should range from 1 - 7
    // Since we already know that 49 <= e.keycode <= 55
    // Multiply result of (keycode - 48) should produce a range of 100 - 700
    // Subtract by 40 to get one of 7 possible x values for the columns
    function calculateChipColumn(keyCode) {
	return (keyCode - 48) * 100 - 40;
    }
    // calculates the row to put it in
    function calculateChipRow(column) {
	return 560 - column * 100;
    }

}
