$(document).ready(function(){
		var currentMonth;
		var d = new Date();
		var month = d.getMonth();
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
		var currentYear = d.getFullYear();
		$('.m').html(currentMonth);
		$('.y').html(currentYear);
		$('.prev').click(function(){
			month-=1;
			$('.m').html(currentMonth);
			/*
			var year = parseInt($('.y').html());
			var prev_Year = year-1;
			if(month == 12){
			$('.y').html(prev_Year);
			}
			*/
		});
		$('.next').click(function(){
			/*
			var month = parseInt($('.m').html());
			var next_Month = month+1;
			if(next_Month > 12){
				next_Month = 1;
			}
			$('.m').html(next_Month);
			var year = parseInt($('.y').html());
			var next_Year = year+1;
			if(next_Month == 1){
				$('.y').html(next_Year);
			}
			*/
		});
});
