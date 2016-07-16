var canvas = document.getElementById('canvas');

if (!canvas) {
    alert("Could not find canvas! Maybe game.js might have been moved in the html file. It should be loaded after all the HTML markup, not before.");
}

if (!canvas.getContext) {
    alert("Browser not HTML5 compliant. Could not load Connect 4 game!");
}

if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var drag = false;

    // call setup
    setup();

    // Mouse functions
    canvas.onmousedown = myDown;
    canvas.onmouseup = myUp;

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

    /* ============================================
       ANIMATION
       ========================================= */

    // runs once
    function setup() {
	requestAnimationFrame(draw);
    }

    function draw() {
	// top part
	for (i = 1; i <= 4; i++){
	    for (j = 1; j <= i; j++){
		var xcor = 400-(i-1)*30 +(j-1)*60;
		var ycor = 25+(i-1)*50;
		var radius = 20;
		ctx.beginPath();
		ctx.arc(xcor,ycor,radius,0,2*Math.PI,false);
		ctx.closePath();
		var grd=ctx.createRadialGradient(xcor+10,ycor-10,1,xcor,ycor,20);
		grd.addColorStop(0,"white");
		grd.addColorStop(1,"red");
		ctx.fillStyle = grd;
		ctx.fill();
		ctx.stroke();
	    }
	}

	// 2nd section
	for (i = 9; i <=13 ; i++){
	    for (j = 1; j <= i; j++){
		var xcor = 400-(i-1)*30 + (j-1)*60;
		var ycor = 25+(i-1)*50;
		var radius = 20;
		ctx.beginPath();
		ctx.arc(xcor,ycor,radius,0,2*Math.PI,false);
		ctx.closePath();
		ctx.stroke();
	    }
	}

	// 3rd section
	for (i = 13; i >= 10; i--){
	    for (j = 1; j <= i; j++){
		var xcor = 400-(i-1)*30 + (j-1)*60;
		var ycor = 325-(i-11)*50;
		var radius = 20;
		ctx.beginPath();
		ctx.arc(xcor,ycor,radius,0,2*Math.PI,false);
		ctx.closePath();
		ctx.stroke();
	    }
	}

	// bottom
	for (i = 1; i <= 4; i++){
	    for (j = 1; j <= i; j++){
		var xcor = 400-(i-1)*30 + (j-1)*60;
		var ycor = 825-(i-1)*50;
		var radius = 20;
		ctx.beginPath();
		ctx.arc(xcor,ycor,radius,0,2*Math.PI,false);
		ctx.closePath();
		ctx.stroke();
	    }
	}
    }
}
