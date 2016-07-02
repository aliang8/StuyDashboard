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

function alignDates(year,month){
    var firstDay = new Date(year,month,1);
    $('.days li').each(function(){
	if($(this).text() == ""){
	    $(this).remove();
	}
    });
    if (firstDay.getDay() != 0) {
	for(i = 0; i < firstDay.getDay(); i++){
	    $('.days').prepend("<li></li>");
	}
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

function numDays() {
    var numTags = "";
    for (i = 1; i <= 31; i++) {
	numTags += "<li>" + i.toString() + "</li>\n";
    }
    return numTags;
}

function displayDays() {    
    $('.weekdays').append(weekdays());
    $('.days').append(numDays());
}

$(document).ready(function(){
    var d = new Date();
    var monthNum = d.getMonth();
    var currentYear = d.getFullYear();
    var currentDate = d.getDate();
    var currentMonth = getMonthName(monthNum);
    $('.m').html(currentMonth);
    $('.y').html(currentYear);
    displayDays();

    $('.days li').each(function(){
	if($(this).text() == currentDate){
	    $(this).html('<span class = "active">' + currentDate + '</span>')
	}
    });
    fixDays(monthNum);
    alignDates(currentYear, monthNum);

    $(document).on("click", ".prev", function(){
	monthNum -= 1;
	if (monthNum == -1) {
	    monthNum = 11;
	    currentYear -= 1;
	}
	currentMonth = getMonthName(monthNum);
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
	currentMonth = getMonthName(monthNum);
	fixDays(monthNum);
	alignDates(currentYear,monthNum);
	$('.m').html(currentMonth);
	$('.y').html(currentYear);
    });
});
