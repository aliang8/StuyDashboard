function isEmpty(element) {
    return !$.trim(element.val());
}

$(document).ready(function(){
    $('#add-to-list').click(function(){
	if (!isEmpty($('textarea'))) {
            var toAdd = $('textarea').val();
            $('.panel-group').append('<div id = "checklist" class="panel panel-default"><div class="panel-body"><label><input type = "checkbox" value = "' 
			+ toAdd + '">' + toAdd + '</label></div></div>');
	}
    });
	$('#flashcards').flip({
		axis: 'y',
		trigger: 'click'
	}
    // $('textarea').keypress(function(event) {
    // 	if(event.which == 13){
    // 	    var toAdd = $('textarea').val();
    // 	    $('.list').append('<label><input type = "checkbox" value = "' 
    // 			      + toAdd + '">' + toAdd + '</label>');
    // 	}
    // });
    $(document).on('click','label',function(){
        $(this).remove();
    });
	$(document).on('click','#checklist',function(){
        $(this).remove();
    });
});
