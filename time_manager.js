
var Prev_timeIN
var Prev_timeOUT
var Prev_TIMEWORKED

var Entry_array = []


$(document.body).on('focus', '.TIME_IN_TXT' ,function(){
		var index = $('.TIME_IN_TXT').index($(this))
		Prev_timeIN = $(this).val()
		Prev_TIMEWORKED = $('.HOURS_TXT:eq(' + index +')').val()
});


$(document.body).on('focus', '.TIME_OUT_TXT' ,function(){
		var index = $('.TIME_OUT_TXT').index($(this))
		Prev_TIMEWORKED = $('.HOURS_TXT:eq(' + index +')').val()
		Prev_timeOUT = $(this).val()
});



$(document.body).on('blur', '.TIME_IN_TXT' ,function(){
			NEW_timeIN = $(this).val()
			var index = $('.TIME_IN_TXT').index($(this))
			var NAME = $('.NAME_TXT:eq(' + index +')').val()
			var NEW_TIME_WORKED = $('.HOURS_TXT:eq(' + index +')').val()
			
			if(Prev_timeIN != NEW_timeIN && Prev_timeIN != "") {
				console.log("%c" + NAME + "'s %cTIME IN has changed from: " + Prev_timeIN + " to " + NEW_timeIN + ".", 'color: #222; color: red', 'color: #222; color: black')
				console.log("PREV TIME WORKED: " + Prev_TIMEWORKED + " NEW TIME WORKED: " + NEW_TIME_WORKED)
				Entry_array.push(NAME + "'s TIME IN has changed from: " + Prev_timeIN + " to " + NEW_timeIN + ".")
				localStorage.setItem("TIME EDITS", JSON.stringify(Entry_array));
			}
});


$(document.body).on('blur', '.TIME_OUT_TXT' ,function(){
			NEW_time = $(this).val()
			var index = $('.TIME_OUT_TXT').index($(this))
			var NAME = $('.NAME_TXT:eq(' + index +')').val()
			var NEW_TIME_WORKED = $('.HOURS_TXT:eq(' + index +')').val()
						
			if(Prev_timeOUT != NEW_time && Prev_timeOUT != "") {
				console.log("%c" + NAME + "'s %cTIME OUT has changed from: " + Prev_timeOUT + " to " + NEW_time + ".", 'color: #222; color: red', 'color: #222; color: black')
				console.log("PREV TIME WORKED: " + Prev_TIMEWORKED + " NEW TIME WORKED: " + NEW_TIME_WORKED)
				Entry_array.push(NAME + "'s TIME OUT has changed from: " + Prev_timeOUT + " to " + NEW_time + ".")
				localStorage.setItem("TIME EDITS", JSON.stringify(Entry_array));
			}
			
});



function BuildReport() {
   
   var TIMES_REPORT = ""
   
   var Times = JSON.parse(localStorage.getItem("TIME EDITS"))
	for(var x = 0; x < Times.length; x++)
		TIMES_REPORT += Times[x] + "\n"
	
	return TIMES_REPORT
}


	
	

