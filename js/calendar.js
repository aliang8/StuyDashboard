function getMonthName(month) {
    var monthName = "";
    switch(month){
    case 0:
	monthName = "January";
	break;
    case 1:
	monthName = "February";
	break;
    case 2:
	monthName = "March";
	break;
    case 3:
	monthName = "April";
	break;
    case 4:
	monthName = "May";
	break;
    case 5:
	monthName = "June";
	break;
    case 6:
	monthName = "July";
	break;
    case 7:
	monthName = "August";
	break;
    case 8:
	monthName = "September";
	break;
    case 9:
	monthName = "October";
	break;
    case 10:
	monthName = "November";
	break;
    case 11:
	monthName = "December";
	break;
    }
    return monthName;
}

function fixDays(monthNum){
    if(monthNum == 1){
	$('.days li').each(function(){
	    if($(this).text() >= 29){
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
	    if($(this).text() >= 29){
		$(this).show();
	    } 
	});
    }
}

function weekdays() {
    var dayTags = "<li>Su</li>\n" +
	    "<li>Mo</li>\n" +
	    "<li>Tu</li>\n" +
	    "<li>We</li>\n" + 
	    "<li>Th</li>\n" +
	    "<li>Fr</li>\n" +
            "<li>Sa</li>\n"
    return dayTags;
}

function numDays(year, month) {
    var numTags = "";
    var firstDay = new Date(year, month, 1);
    // getDay() returns 0 if the day is Sunday, so we make sure that
    // we do not prepend a placeholder if the day is Sunday
    // Otherwise, there would be an extra <li> prepended, messing up
    // the layout of the calendar
    if (firstDay.getDay() != 0) {
	for(i = 0; i < firstDay.getDay(); i++) { 
	    numTags += "<li></li>\n";
	}
    }
    for (i = 1; i <= 31; i++) {
	numTags += "<li>" + i.toString() + "</li>\n";
    }
    return numTags;
}

function displayDays(year, month) {    
    $('.weekdays').append(weekdays());
    $('.days').append(numDays(year, month));
}

function activeDay(date) {
    $('.days li').each(function(){
	if ($(this).text() == date){
	    $(this).html('<span class = "active">' + date + '</span>')
	}
    });
}

$(document).ready(function(){
    var d = new Date();
    var monthNum = d.getMonth();
    var currentYear = d.getFullYear();
    var currentDate = d.getDate();
    var currentMonth = getMonthName(monthNum);
    $('.m').html(currentMonth);
    $('.y').html(currentYear);
    displayDays(currentYear, monthNum);
    fixDays(monthNum);
    activeDay(currentDate);

    $(document).on("click", ".prev", function(){
	$('.weekdays').empty();
	$('.days').empty();
	monthNum -= 1;
	if (monthNum == -1) {
	    monthNum = 11;
	    currentYear -= 1;
	}
	displayDays(currentYear, monthNum);
	activeDay(currentDate);
	currentMonth = getMonthName(monthNum);
	fixDays(monthNum);
	$('.m').html(currentMonth);
	$('.y').html(currentYear);
    });

    $(document).on("click", ".next", function() {
	$('.weekdays').empty();
	$('.days').empty();
	monthNum += 1;
	if (monthNum == 12) {
	    monthNum = 0;
	    currentYear += 1;
	}
	displayDays(currentYear, monthNum);
	activeDay(currentDate);
	currentMonth = getMonthName(monthNum);
	fixDays(monthNum);
	$('.m').html(currentMonth);
	$('.y').html(currentYear);
    });
});
