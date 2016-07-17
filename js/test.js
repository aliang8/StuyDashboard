var canvas = document.getElementById('canvas');

if (!canvas) {
    alert("Could not find canvas! Maybe cc.js might have been moved in the html file. It should be loaded after all the HTML markup, not before.");
}

if (!canvas.getContext) {
    alert("Browser not HTML5 compliant. Could not load Chinese Checkers game!");
}

if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var drag = false;

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

    function OpenSlot(x, y, radius, hasPiece) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.hasPiece = hasPiece;
    }

    function PebblePiece(x, y, radius, color) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
    }

    var board = [];
    var pieces = [];

    // call setup
    setup();

    /* ============================================
       MOUSE EVENTS
       ========================================= */

    canvas.onmousedown = myDown;
    canvas.onmouseup = myUp;

    var playerPiece = null;

    function getMouseX(e) {
	mouseX = e.clientX - canvas.offsetLeft;
	return mouseX;
    }

    function getMouseY(e) {
	mouseY = e.clientY - canvas.offsetTop;
	return mouseY;
    }

    function myMove(e){
    	if (drag) {
    	    playerPiece.x = getMouseX(e);
    	    playerPiece.y = getMouseY(e);
    	}
    }

    function myDown(e){
	var xcor;
	var ycor;
	for (i = 0; i < pieces.length; i++) {
	    xcor = pieces[i].x;
	    ycor = pieces[i].y;
    	    if (getMouseX(e) < xcor + pieces[i].radius && getMouseX(e) > xcor - pieces[i].radius &&
		getMouseY(e) < ycor + pieces[i].radius && getMouseY(e) > ycor - pieces[i].radius) {
		console.log("Mouse coords: " + getMouseX(e) + ", " + getMouseY(e));
		console.log("Color: " + pieces[i].color);
    		drag = true;
		playerPiece = pieces[i];
    		canvas.onmousemove = myMove;
    	    }
	}
    }

    function myUp(){
    	drag = false;
    	canvas.onmousemove = null;
	playerPiece = null;
    }

    /* ============================================
       ANIMATION
       ========================================= */

    // runs once
    function setup() {
	prerender();
	requestAnimationFrame(draw);
    }

    function prerender() {
	// center hexagaon - top part
	for (i = 9; i <=13 ; i++){
	    for (j = 1; j <= i; j++){
		var xcor = 400-(i-1)*30 + (j-1)*60;
		var ycor = 25+(i-1)*50;
		var radius = 20;
		board.push(new OpenSlot(xcor, ycor, radius, false));
	    }
	}

	// center hexagon - bottom part
	for (i = 13; i >= 10; i--){
	    for (j = 1; j <= i; j++){
		var xcor = 400-(i-1)*30 + (j-1)*60;
		var ycor = 325-(i-11)*50;
		board.push(new OpenSlot(xcor, ycor, radius, false));
	    }
	}

	// yellow triangle
	for (i = 1; i <= 4; i++){
	    for (j = 1; j <= i; j++){
		var xcor = 400-(i-1)*30 +(j-1)*60;
		var ycor = 25+(i-1)*50;
		makeCircle(xcor, ycor, "yellow");
	    }
	}

	// red triangle
	for (i = 1; i <= 4; i++){
	    for (j = 1; j <= i; j++){
		var xcor = 400-(i-1)*30 + (j-1)*60;
		var ycor = 825-(i-1)*50;
		makeCircle(xcor,ycor,"red");
	    }
	}

	// blue triangle
	for (i = 1; i <= 4; i++){
            for (j = 1; j <= i; j++){
		var xcor = 130-(i-1)*30 +(j-1)*60;
		var ycor = 375-(i-1)*50;
		makeCircle(xcor,ycor,"blue");
            }
        }

	// green triangle
	for (i = 1; i <= 4; i++){
            for (j = 1; j <= i; j++){
		var xcor = 670-(i-1)*30 +(j-1)*60;
		var ycor = 375-(i-1)*50;
		makeCircle(xcor,ycor,"green");
	    }
        }

	// purple triangle
	for (i = 1; i <= 4; i++){
            for (j = 1; j <= i; j++){
                var xcor = 130-(i-1)*30 +(j-1)*60;
                var ycor = 475+(i-1)*50;
                makeCircle(xcor,ycor,"purple");
            }
        }

	// orange triangle
	for (i = 1; i <= 4; i++){
            for (j = 1; j <= i; j++){
                var xcor = 670-(i-1)*30 +(j-1)*60;
                var ycor = 475+(i-1)*50;
                makeCircle(xcor,ycor,"orange");
            }
        }
	// console.log(board.length);
	// console.log(pieces.length);
    }

    function draw() {
	// Clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Draw slots
	for (i = 0; i < board.length; i++) {
	    ctx.beginPath();
	    ctx.arc(board[i].x,board[i].y,board[i].radius,0,2*Math.PI,false);
	    ctx.closePath();
	    ctx.stroke();
	}

	// Draw pieces
	for (i = 0; i < pieces.length; i++) {
	    var xcor = pieces[i].x;
	    var ycor = pieces[i].y;
	    var r = pieces[i].radius;
	    var c = pieces[i].color;
	    ctx.beginPath();
	    ctx.arc(xcor,ycor,r,0,2*Math.PI,false);
	    ctx.closePath();
	    var grd=ctx.createRadialGradient(xcor+10,ycor-10,1,xcor,ycor,r);
	    grd.addColorStop(0,"white");
	    grd.addColorStop(1,c);
	    ctx.fillStyle = grd;
	    ctx.fill();
	    ctx.stroke();
	}
	requestAnimationFrame(draw);

    }

    function makeCircle(xcor,ycor,color){
	board.push(new OpenSlot(xcor, ycor, 20, true));
	pieces.push(new PebblePiece(xcor, ycor, 20, color));
    }
}
