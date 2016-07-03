$(document).ready(function(){
	$(document).one('focus.textarea', '.autoExpand', function() {
		var savedValue = this.value;
		this.value = '';
		this.baseScrollHeight = this.scrollHeight;
		this.value = savedValue;
	  })
	  .on('input.textarea', '.autoExpand', function() {
		var minRows = this.getAttribute('data-min-rows') | 0,
		  rows;
		this.rows = minRows;
		console.log(this.scrollHeight, this.baseScrollHeight);
		rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
		this.rows = minRows + rows;
	  });
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