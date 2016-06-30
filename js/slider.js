var main = function(){
    $(document).keydown(function(event){
		if(event.which == 37){
			var currentSlide = $('.active-slide');
			var nextSlide = currentSlide.next();
			if(nextSlide.length == 0){
				nextSlide = $('.slide').first();
			}
			currentSlide.fadeOut(600).removeClass('active-slide');
			nextSlide.fadeIn(600).addClass('active-slide');
		} else if (event.which == 39) {
			var currentSlide = $('.active-slide');
			var prevSlide = currentSlide.prev();
			if(prevSlide.length == 0){
				prevSlide = $('.slide').last();
			}
			currentSlide.fadeOut(600).removeClass('active-slide');
			prevSlide.fadeIn(600).addClass('active-slide');
		}
    });
	$('#make-flashcard').click(function(){
		var term = $('[id=term]').val();
		var definition = $('[id=definition]').val();
		$('#flashcards').append('<div class="slide"><div class = "front">'
		+ term + '</div><div class = "back">' + definition + '</div></div>');
		$('[id=term]').val("");
		$('[id=definition]').val("");
	});
}

$(document).ready(main);