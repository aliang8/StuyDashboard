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

$(document).ready(function(){
    var d = new Date();
    var monthNum = d.getMonth();
    getMonthName(monthNum);
    var currentYear = d.getFullYear();
    $('.m').html(currentMonth);
    $('.y').html(currentYear);
    $(document).on("click", ".prev", function(){
	monthNum -= 1;
	if (monthNum == -1) {
	    monthNum = 11;
	    currentYear -= 1;
	}
	getMonthName(monthNum);
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
	$('.m').html(currentMonth);
	$('.y').html(currentYear);
    });
});
