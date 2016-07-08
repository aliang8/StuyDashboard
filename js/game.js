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
    function ChipPiece(x, y, r) {
	this.x = x;
	this.y = y;
	this.radius = r;
	this.color = "red";
    }

    // Array of chips
    var chipArray = [];

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

	// Animate all chips in the chip array
	for (i = 0; i < chipArray.length; i++) {
	    animatePiece(chipArray[i]);
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
    }

    /* ============================================
       KEY EVENTS
       ========================================= */

    // when a key is pressed, check if number key
    document.body.addEventListener('keydown', function(e) {
	newTurn(e);
    });

    function newTurn(e) {
	// if number keys pressed, add new piece to chip array
	if (e.keyCode >= 49 && e.keyCode <= 55){
	    alert("Number keys pressed");
	    chipArray.push(new ChipPiece(calculateChipXCoord(e.keyCode), 60, 42));
	}
    }

    // Calculates which column to put it in
    // The result of (keyCode - 48) should range from 1 - 7
    // Since we already know that 49 <= e.keycode <= 55
    // Multiply result of (keycode - 48) should produce a range of 100 - 700
    // Subtract by 40 to get one of 7 possible x values for the columns
    function calculateChipXCoord(keyCode) {
	return (keyCode - 48) * 100 - 40;
    }

}
