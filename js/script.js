$(document).ready(function(){
    $('#button').click(function(){
        var toAdd = $('textarea').val();
        $('.list').append('<label><input type = "checkbox" value = "' + toAdd + '">' + toAdd + '</label>');
    });
	$('textarea').keypress(function(event) {
		if(event.which == 13){
			var toAdd = $('textarea').val();
			$('.list').append('<label><input type = "checkbox" value = "' 
			+ toAdd + '">' + toAdd + '</label>');
		}
	});
    $(document).on('click','label',function(){
        $(this).remove();
    });
});
