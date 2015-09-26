/*Get all the weekdays of the given date*/
var calendarView; // Defines current view of calendar.
var calendarCurrentViewDate; // Defines start date of the current calendar view.

function getWeekData(date){
	var weekData = [];
	var daysInWeek = [];
	var datesInWeek = [];
	var dayMonthInWeek = [];
	var startDateOfWeek = moment(date).startOf('week');
	for(var weekDay = 0; weekDay < 7; weekDay++){
		var nextDay = moment(startDateOfWeek).add(weekDay,'days');
	    daysInWeek.push(nextDay.get('date'));
	    datesInWeek.push(nextDay.format('YYYY-MM-DD')); 
		dayMonthInWeek.push(nextDay.format('ddd M/D'));
	}
	weekData.push(daysInWeek);
	weekData.push(datesInWeek);
	weekData.push(dayMonthInWeek);
	return weekData;
}

/*get dates of given Month and Year*/
function getMonthView(month,year){
	console.time('getMonth');
	
	calendarView = 'month';
	calendarCurrentViewDate = moment().set({'year': year, 'month': month}).startOf('month')._d;//
	/*Move to different function*/
	var calendarTitle = document.getElementById('calendar-title');
	calendarTitle.innerHTML = '';
	calendarTitle.innerHTML = calendarTitle.innerHTML + moment().set({'year': year, 'month': month}).format('MMMM YYYY');
	/*Move to different function*/

	var monthYear = year +'-'+ month;
	// var numberOfDaysInMonth = moment(monthYear).daysInMonth();
	var monthView = '';
	monthView += '<div class="customCal-view-container" style=""><div class="customCal-view"><table><thead><tr><td><div class="customCal-row"><table><thead><tr><th>User</th><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr></thead></table></div></td></tr></thead><tbody><tr><td><div><div>';
	var startOfWeek = moment(calendarCurrentViewDate).startOf('week');
	var weekData = getWeekData(startOfWeek._d);
	monthView += weekView(weekData);
	for(var week = 0; week < 5; week++){
		weekData = [];
		var currentWeek = startOfWeek.add(1, 'weeks')._d;
		var weekData = getWeekData(startOfWeek._d);
		monthView += weekView(weekData)
	}
	monthView += '</div></div></td></tr></tbody></table></div>';
	var div = document.getElementById('calendar');
	div.innerHTML = '';
	div.innerHTML = div.innerHTML + monthView;

	console.timeEnd('getMonth');
}

function weekView(weekData){
	var daysInWeek = weekData[0];
	var datesInWeek = weekData[1];
	var backgroundTdHtml = '';
	var contentSkeletonHtml = '';
    for(var weekDay = 0; weekDay < 7; weekDay++) {
    	backgroundTdHtml += '<td data-date="'+ datesInWeek[weekDay] +'"></td>';
    	contentSkeletonHtml += '<td data-date="'+ datesInWeek[weekDay] +'">'+daysInWeek[weekDay]+'</td>';
	}
    var htmlString = '<div class="customCal-row" style="height: 108px;"><div class="customCal-bg"><table><tbody><tr><td></td>'+backgroundTdHtml+'</tr></tbody></table></div><div class="customCal-content-skeleton customCal-bg"><table><thead><tr><td></td>'+contentSkeletonHtml+'</tr></thead><tbody></tbody></table></div></div>';
    return htmlString;
}

function getOneWeekView(date){
	console.time('getWeek');
	calendarView = 'week';
	calendarCurrentViewDate = date;

	/*Move to different function*/
	var calendarTitle = document.getElementById('calendar-title');
	calendarTitle.innerHTML = '';
	if(moment(date).startOf('week').get('month') == moment(date).endOf('week').get('month'))
		calendarTitle.innerHTML = calendarTitle.innerHTML + moment(date).startOf('week').format('MMM D')+'-'+moment(date).endOf('week').format('D') +','+ moment(date).format('YYYY');
	else
		calendarTitle.innerHTML = calendarTitle.innerHTML + moment(date).startOf('week').format('MMM D')+'-'+moment(date).endOf('week').format('MMM D')+','+moment(date).format('YYYY');
	/*Move to different function*/
	// var monthYear = year +'-'+ month;
	var startOfWeek = moment(date).startOf('week');
	var weekData = getWeekData(startOfWeek._d);
	var daysInWeek = weekData[0];
	var datesInWeek = weekData[1];
    var dayMonthInWeek = weekData[2];
    var tableHeaderHtml = '';
	var contentSkeletonHtml = '';
	var weekView = '';
	weekView += '<div class="customCal-view-container" style=""><div class="customCal-view" style=""><table><thead><tr><td class="customCal-widget-header"><div class="customCal-row customCal-widget-header"><table><thead><tr><th>User</th>';
	for(var weekDay = 0; weekDay < 7; weekDay++) {
    	tableHeaderHtml += '<th>'+ dayMonthInWeek[weekDay] +'</th>';
    	contentSkeletonHtml += '<td data-date="'+ datesInWeek[weekDay] +'"></td>';
	}
	weekView += tableHeaderHtml + '</tr></thead></table></div></td></tr></thead><tbody><tr><td><div style=""><div><div class="customCal-row" style="height: 882px;"><div class="customCal-bg"><table><tbody><tr><td></td>';
	weekView += contentSkeletonHtml + '</tr></tbody></table></div><div class="customCal-content-skeleton"><table><tbody></tbody></table><div></div></div></div></td></tr></tbody></table></div></div>';
	var div = document.getElementById('calendar');
	div.innerHTML = '';
	div.innerHTML = div.innerHTML + weekView;
	console.timeEnd('getWeek');
}
/*print the month :
	1.select month and day.
	2.create moment date with date=1, and selected month and year.
	3.get 1st is which day of the week.
	4.fill the other days with previous month.
	5.find the max days in the current month of the year.
	6.number of weeks.*/

/*Function to load month selected*/	
function loadMonthView(){
	var date = calendarCurrentViewDate ? moment(calendarCurrentViewDate) : moment();
	var month = date.get('month'); //moment get() method considers january as month 0.
	var year = date.get('year');
	getMonthView(month,year);
}

/*Function to load week selected*/
function loadWeekView(){
	var date = calendarCurrentViewDate ? moment(calendarCurrentViewDate) : moment();
	getOneWeekView(date._d);
}


/*Function to load todays view(month/week)*/
function todayView(){
	switch(calendarView){
		case 'month':
			var date = moment();
			var month = date.get('month'); //moment get() method considers january as month 0.
			var year = date.get('year');
			getMonthView(month,year);
			break;
		case 'week':
			var date = moment();
			getOneWeekView(date._d);
			break;
		default:
			return;
	}
}

function nextMonthWeek(){
	switch(calendarView){
		case 'month':
			var date = moment(calendarCurrentViewDate).add(1,'month');
			calendarCurrentViewDate = date._d; 
			var month = date.get('month'); //moment get() method considers january as month 0.
			var year = date.get('year');
			getMonthView(month,year);
			break;
		case 'week':
			var date = moment(calendarCurrentViewDate).add(1,'week');
			calendarCurrentViewDate = date._d;
			getOneWeekView(date._d);
			break;
		default:
			return;
	}
}

function previousMonthWeek(){
	switch(calendarView){
		case 'month':
			var date = moment(calendarCurrentViewDate).subtract(1,'month');
			calendarCurrentViewDate = date._d; 
			var month = date.get('month'); //moment get() method considers january as month 0.
			var year = date.get('year');
			getMonthView(month,year);
			break;
		case 'week':
			var date = moment(calendarCurrentViewDate).subtract(1,'week');
			calendarCurrentViewDate = date._d;
			getOneWeekView(date._d);
			break;
		default:
			return;
	}
}