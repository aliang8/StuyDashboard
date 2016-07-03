$(document).ready(function(){
	$('.period').click(function(){
		$('.period').keypress(function(event){
			if(event.which == 13){
				$("tbody tr textarea").each(function(){
					console.log($(this).val());
				});
			}
		});
	});
	$('#set-schedule').click(function(){
		$("tbody tr").each(function(){
			$(':nth-child(2)',this).html($('tbody tr textarea').val());
		});
	});
	$('#edit-schedule').click(function(){
		$("tbody tr").each(function(){
			$(':nth-child(2)',this).html('<textarea class="period">' 
			+ $(':nth-child(2)',this).html() + '</textarea>');
		});
	});
});