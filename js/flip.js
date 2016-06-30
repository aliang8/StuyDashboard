var main = function() {
    next_flashcard();
    make_flashcard();
    flip();
}

var next_flashcard = function(){
    $(document).keydown(function(event){
		if(event.which == 39){ // left arrow key
			var currentSlide = $('.active-slide');
			var nextSlide = currentSlide.next();
			if(nextSlide.length == 0){
				nextSlide = $('.flip-container').first();
			}
			currentSlide.fadeOut(600).removeClass('active-slide');
			nextSlide.fadeIn(600).addClass('active-slide');
		} else if (event.which == 37) { // right arrow key
			var currentSlide = $('.active-slide');
			var prevSlide = currentSlide.prev();
			if(prevSlide.length == 0){
				prevSlide = $('.flip-container').last();
			}
			currentSlide.fadeOut(600).removeClass('active-slide');
			prevSlide.fadeIn(600).addClass('active-slide');
		}
    });
}

var make_flashcard = function() {
    $('#make-flashcard').click(function(){
	var term = $('[id=term]').val();
	var definition = $('[id=definition]').val();
	$('#flashcards').append('<div class="flip-container"><div class="flipper"><div class = "front">'
				+ term + '</div><div class = "back">' + definition + '</div></div></div>');
	$('[id=term]').val("");
	$('[id=definition]').val("");
    });
}

var flip = function() {
    var flipped = false;
    $(document).on("click",'.active-slide', function() {
    	console.log("testing");
	if (flipped) {
	    $('.active-slide .flipper > .back').css({'transform': 'rotateY(180deg)'});
    	    $('.active-slide .flipper > .front').css({'transform': 'rotateY(0deg)'});
	} else {
    	    $('.active-slide .flipper > .back').css({'transform': 'rotateY(0deg)'});
    	    $('.active-slide .flipper > .front').css({'transform': 'rotateY(180deg)'});
	}
	flipped = !flipped;
    });
}

$(document).ready(main);
