$(document).ready(function(){
	$('.periods').click(function(){
		$('.periods').keypress(function(event)){
			if(event.which == 13){
				$('.glyphicon').hide();
			}
		});
	});
});