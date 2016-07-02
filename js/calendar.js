var currentMonth;

var getMonthName = function(month) {
    switch(month){
    case 0:
	currentMonth = "January";
	break;
    case 1:
	currentMonth = "February"
	break;
    case 2:
	currentMonth = "March"
	break;
    case 3:
	currentMonth = "April"
	break;
    case 4:
	currentMonth = "May"
	break;
    case 5:
	currentMonth = "June"
	break;
    case 6:
	currentMonth = "July"
	break;
    case 7:
	currentMonth = "August"
	break;
    case 8:
	currentMonth = "September"
	break;
    case 9:
	currentMonth = "October"
	break;
    case 10:
	currentMonth = "November"
	break;
    case 11:
	currentMonth = "December"
	break;
    }
}

var fixDays = function(monthNum){
	if(monthNum == 1){
		$('.days li').each(function(){
			if($(this).text() == 29 || $(this).text() == 30 || $(this).text() == 31){
				$(this).hide();
			} 
		});
	} else if(monthNum == 3 || monthNum == 5 || monthNum == 8 || monthNum == 10){
		$('.days li').each(function(){
			if($(this).text() == 31){
				$(this).hide();
			} 
			if($(this).text() == 29 || $(this).text() == 30){
				$(this).show();
			} 
		});
	} else {
		$('.days li').each(function(){
			if($(this).text() == 29 || $(this).text() == 30 || $(this).text() == 31){
				$(this).show();
			} 
		});
	}
}

var alignDates = function(year,month){
	var firstDay = new Date(year,month,1);
	$('.days li').each(function(){
		if($(this).text() == ""){
			$(this).remove();
		}
	});
	for(i = -1; i < firstDay.getDay(); i++){
		$('.days').prepend("<li></li>");
	}
}

$(document).ready(function(){
    var d = new Date();
    var monthNum = d.getMonth();
    getMonthName(monthNum);
    var currentYear = d.getFullYear();
	var currentDate = d.getDate();
    $('.m').html(currentMonth);
    $('.y').html(currentYear);
	console.log(monthNum == 7);
	$('.days li').each(function(){
		if($(this).text() == currentDate){
			$(this).html('<span class = "active">' + currentDate + '</span>')
		}
	});
	fixDays(monthNum);
	alignDates(currentYear,monthNum);
    $(document).on("click", ".prev", function(){
	monthNum -= 1;
	if (monthNum == -1) {
	    monthNum = 11;
	    currentYear -= 1;
	}
	getMonthName(monthNum);
	fixDays(monthNum);
	alignDates(currentYear,monthNum);
	$('.m').html(currentMonth);
	$('.y').html(currentYear);
    });
    $(document).on("click", ".next", function() {
	monthNum += 1;
	if (monthNum == 12) {
	    monthNum = 0;
	    currentYear += 1;
	}
	getMonthName(monthNum);
	fixDays(monthNum);
	alignDates(currentYear,monthNum);
	$('.m').html(currentMonth);
	$('.y').html(currentYear);
    });
});
