function draw() {
      var canvas = document.getElementById("canvas");
	  window.addEventListener("keydown", newTurn, false);
      if (canvas.getContext) {
          var ctx = canvas.getContext("2d");
	  // Yellow board
	  ctx.fillStyle = "#ffff00";
	  ctx.fillRect(10,10,700,600);
	  // Blue bottom
	  ctx.strokeRect(5,610,710,25);
	  ctx.fillStyle = "#0000ff";
	  ctx.fillRect(5,610,710,25);
	  // Draws vertical lines that separate the columns
	  for(i = 0; i <= 710; i+= 100){
	      ctx.moveTo(i+10,10);
	      ctx.lineTo(i+10,610);
	      ctx.stroke();
	  }
	  // Draws horizontal lines that separate the rows
	  for(i = 0; i <= 610; i+= 100){
	      ctx.moveTo(10,i+10);
	      ctx.lineTo(710,i+10);
	      ctx.stroke();
	  }
	  // Draws the holes
	  for(j = 60; j <= 660; j+= 100){
	      for(i = 60; i <= 560; i+= 100){
		  ctx.shadowOffsetX = -1;
		  ctx.shadowOffsetY = 1;
		  ctx.shadowBlur = 5;
		  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
		  ctx.beginPath();
		  ctx.arc(j,i,42,0,Math.PI*2,false);
		  ctx.fillStyle = '#ffffff';
		  ctx.fill();
	      }
	  }
      }
}

function newTurn(e){
    var ctx = document.getElementById("canvas").getContext("2d");
	if(e.keyCode == 49){
		animate(0,0);
	}
}

function animate(x,y){
	var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.save();
    ctx.clearRect(0,0,550,400);
    ctx.fillStyle = "rgba(0,200,0,1)";
    ctx.fillRect (x, y, 50, 50);
    ctx.restore(); 
    x += 1;
    var loopTimer = setTimeout('animate('+x+','+y+')',30);
}