$(document).ready(function(){
    $('#button').click(function(){
        var toAdd = $('input[name=checkListItem]').val();
        $('.list').append('<label><input type = "checkbox" value = "' + toAdd + '">' + toAdd + '</label><br>');
    });
    $(document).on('click','label',function(){
        $(this).remove();
    });
});
