var Row_values = {
	Name:'<td><input class="NAME_TXT" type="text" list="workers" /></td>', 
	PhoneNumber: '<td><input placeholder="with Areacode" class="PHONE_TXT" onblur="validPhoneNumber(this)" type="text" /></td>',
	Address: '<td><input class="ADDRESS_TXT" type="text" /></td>',
	Email: '<td><input class="EMAIL_TXT" type="email" /></td>',
	JobDescription: '<td><input style="display: none;" type="text" /><select class="size" required><option disabled selected value></option></select></td>', 
	TimeIn: '<td><input class="TIME_IN_TXT" type="time" /></td>',
	Timeout: '<td><input class="TIME_OUT_TXT"  required type="time" /></td> ',
	Hours: '<td><input class="HOURS_TXT" readonly required type="text" /></td>'
};

	
var TIME_TIL_SAVE = 2200	
var ALL_NAMES = []	
		
$(document).ready(function(){
   
   var d = new Date();
   var date = d.toLocaleDateString('en-US');
   document.getElementById("datetxt").value = date
      
});

$(".header").dblclick(function(){
    makeCSV()
});


function showHelp() {

	$("#HELP").animate({
        left: '25%',
		width: '50%',
		top: '18vh',
    });
		$("#HELP_BACKGROUND").show();
		
	$("#HELP_BACKGROUND").animate({
        borderRadius: '100px',
		width: '80%',
		height: '70vh'
    }, 100);
		
}


function closeHelp() {
	$("#HELP").animate({
        left: '-300px',
		width: '50',
		top: '1500px'
    });

	$("#HELP_BACKGROUND").animate({
		width: '0%',
		height: '0vh'
    }, 20);
	
	$("#HELP_BACKGROUND").hide(220);

	
}


function addTO_NAME_ARRAY() {

		$(".NAME_TXT").each(function() {
			if($(this).val() != "" && jQuery.inArray($(this).val(), ALL_NAMES) == -1 )
				ALL_NAMES.push($(this).val())
		});
	console.log("All names entered: ")
	console.log(ALL_NAMES)
}

	
function validPhoneNumber(_this) {
	var phoneEntered = _this.value
	
	var cleaned = ('' + phoneEntered).replace(/\D/g, '')
	var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
		  if (match) {
			_this.value = '(' + match[1] + ') ' + match[2] + '-' + match[3]
		  }
		  else {
			  _this.value = ""
		  }
}



	  	  
         function populateDD() {
         	var value = ["Packer", "Cupper", "Production", "Stemmer", "Downstairs"];
         	var text = ["Packer", "Cupper", "Production", "Stemmer", "Downstairs"];
         	var option = '';
         	for (var i=0;i<value.length;i++){
         	   option += '<option value="'+ value[i] + '">' + text[i] + '</option>';
         	}
         				
         		$('.size').each(function(){			
         				if(!$(this).hasClass("alreadyAdded")) 
         				{	
         					$(this).append(option)
         					$(this).addClass("alreadyAdded")
         				}
             });
         		
         }
            
         function newRow() {			
				$('#order').append(row);
				populateDD()
         }
		 
		 
		 var keyed = false
		 
		$(document.body).on('dblclick', 'tr' ,function(){
			
			if(keyed) {
				var count = $('#order tr').length
			//CHECK for if row has val
				
				if($(this).hasClass("removable") && count > 3) 
					$( this ).remove()			
				if($(this).hasClass("removable") && count == 4) 
					$("p").css("visibility", "hidden");
			
			
				var TD = $(this).children("td:first")
				var input = TD.children("input").val()
					removeRowLocalStorage(input)
			}
		});
		
		/* PAIR WITH ^^ FOR DELETE */
				$(document).on('keydown','body',function(e) {
				//console.log(e.keyCode);
				if(e.keyCode==13)
					keyed = true;

			});

			$(document).on('keyup','body',function(e) {
				if(e.keyCode==13)
					keyed = false;
			});
		
		 
         var row = '<tr class="removable">' + 
		 Row_values.Name + 
		 Row_values.PhoneNumber + 
		 Row_values.Address + 
		 Row_values.Email +
		 Row_values.TimeIn + 
		 Row_values.Timeout + 
		 Row_values.Hours + 
		 '</tr>'
      
		 
		 
		 $(document.body).on('change', '.size' ,function(){
			var selectValue = $(this).find(":selected").val();
			
			var otherInput = $(this).closest('td').find('input');
			otherInput.val(selectValue)
		});
		 
		 $(document.body).on('focus', 'input' ,function(){
			if($(this).val() != "")
				$('#warning').css("visibility", "visible");
			else 
				$('#warning').css("visibility", "hidden");
		});
		 
		 
var myVar		 
 $(document.body).on('keyup', '.TIME_OUT_TXT' ,function(){
			var index = $('.TIME_OUT_TXT').index($(this))
			doWork(index)	
});
 $(document.body).on('blur', '.TIME_OUT_TXT' ,function(){
			newRow()
});
 $(document.body).on('blur', '.TIME_IN_TXT' ,function(){
			var index = $('.TIME_IN_TXT').index($(this))
			doWork(index)	
});
 $(document.body).on('blur', '.PHONE_TXT' ,function(){
			var index = $('.PHONE_TXT').index($(this))
			doWork(index)	
});
 $(document.body).on('blur', '.ADDRESS_TXT' ,function(){
			var index = $('.ADDRESS_TXT').index($(this))
			doWork(index)	
});
 $(document.body).on('blur', '.ADDRESS_TXT' ,function(){
			var index = $('.ADDRESS_TXT').index($(this))
			doWork(index)	
});
 $(document.body).on('blur', '.EMAIL_TXT' ,function(){
			var index = $('.EMAIL_TXT').index($(this))
			doWork(index)	
});
 $(document.body).on('blur', '.NAME_TXT' ,function(){
			var index = $('.NAME_TXT').index($(this))
			doWork(index)	
});

 $(document.body).on('keydown', 'input' ,function(){
		clearTimeout(myVar)	 
		 myVar = setTimeout(function() { $("#newROWBTN").focus(); }, TIME_TIL_SAVE);
});

$(document.body).on('focus', '.NAME_TXT' ,function(){
		var index = $('.NAME_TXT').index($(this))
			addTO_NAME_ARRAY()
			if($('.NAME_TXT:eq(' + index +')').val() == '')
				setDefualtTime(index)
});


 $(document.body).on('keyup', '.NAME_TXT' ,function(){
				var index = $('.NAME_TXT').index($(this))
			var txtEntered = $(this).val()
			if(jQuery.inArray(txtEntered, ALL_NAMES) !== -1) {
				$(this).val("_" + txtEntered)
			}
			
		});

function setDefualtTime(index) {
	var input = $('.TIME_IN_TXT:eq(' + index +')')
	var d = new Date(); // for now
	var hrs = d.getHours()
	var min = d.getMinutes()
	var MINS = String(min)
	var HRS = String(hrs)
	
	if(MINS.length == 1)
		min = "0" + min
			
	if(HRS.length == 1)
		hrs = "0" + hrs
	
	var time = hrs + ":" + min
	
	
	input.val(time)
}




function doWork(index) {
			var timeOut = $('.TIME_OUT_TXT:eq(' + index +')').val()
			var timeIn = $('.TIME_IN_TXT:eq(' + index +')').val()
			
			var dateOut = getDate(timeOut)
			var dateIN = getDate(timeIn)

			
			var hours = (dateOut.hours - dateIN.hours) 	
			
			var min = 0;	
		
			if(dateOut.mins > dateIN.mins)
				min = (dateOut.mins - dateIN.mins)
			else {
				hours--
				min = (60 - (dateIN.mins - dateOut.mins))
			}
			var MINS = String(min)

			
			if(MINS.length == 1)
				min = "0" + min
			
			if(min == '60') {
				hours++
				min = 0
			}
			var TIME_WORKED
			
			var NAME = $('.NAME_TXT:eq(' + index +')').val()
			var PHONE = $('.PHONE_TXT:eq(' + index +')').val()
			var ADDRESS = $('.ADDRESS_TXT:eq(' + index +')').val()
			if(!isNaN(hours) && !isNaN(min))
				TIME_WORKED = hours + ":" + min
			else 
				TIME_WORKED = ""
			
			var EMAIL = $('.EMAIL_TXT:eq(' + index +')').val()
			
			if(NAME != "")
				addToStorage(NAME, PHONE, ADDRESS, timeIn, timeOut, TIME_WORKED, EMAIL)			
					
			$('.HOURS_TXT:eq(' + index +')').val(TIME_WORKED)
}	
	 
	 
		 
		 
function getDate(string) {
	
	var array = string.split(":")
	var hours = array[0]
	var min = array[1]
	
	var d = new Date();
	d.setMinutes(min)
	d.setHours(hours)
	var toReturn = {hours: d.getHours(), mins:d.getMinutes()};
	return toReturn
	
}
		 
		 

 
function makeCSV() {
 
 var d = new Date();
 var datetxt = document.getElementById("datetxt").value 

  
  var titles = [];
  var data = [];
  
  $('#HEADERS th').each(function() {
    titles.push($(this).text());
  });
  
  $('#order td').each(function() {
		  
	$(this).find("input").each(function() {
        var text = this.value
		data.push(text);
    });
	  
  });
 
		
 
  var startOfFile = ["TIME SHEET", datetxt]; 
  var Headers = ["NAME", "PHONE #", "Address", "EMAIL", "TIME IN", "TIME OUT", "HRS"];
  var End = ["END of Sheet"]
 var loopFor = Headers.length
	var CSVString = prepCSVRow(startOfFile, startOfFile.length, "");
		CSVString = prepCSVRow(Headers, Headers.length, CSVString);
		
	for(var x = 0; (x < data.length / loopFor); x++) {
		
		CSVString = prepCSVRow(getValues(x), loopFor, CSVString);
	}
	
 function getValues(y) {
	var name = ((y * loopFor) )
	var phone = ((y * loopFor) + 1)
	var address = ((y * loopFor) + 2)
	var email = ((y * loopFor) + 3)
	var _in = ((y * loopFor) + 4)
	var _out = ((y * loopFor) + 5)
	var hrs = ((y * loopFor) + 6)
           
	return [data[name], data[phone], data[address], data[email], data[_in], data[_out], data[hrs]]
				 
 }
 

  var downloadLink = document.createElement("a");
  var blob = new Blob(["\ufeff", CSVString]);
  var url = URL.createObjectURL(blob);
  downloadLink.href = url;
  
  var nameOfFile = datetxt + " " + d.toDateString() + ".csv";
  downloadLink.download = nameOfFile
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};
function prepCSVRow(arr, columnCount, initial) {
  var row = '';
  var delimeter = ','; 
  var newLine = '\r\n'; 
  var plainArr = splitArray(arr, columnCount);
  plainArr.forEach(function(arrItem) {
    arrItem.forEach(function(item, idx) {
      row += item + ((idx + 1) === arrItem.length ? '' : delimeter);
    });
   
  });
   row += newLine;
  
  
  return initial + row;
 
}
    function splitArray(_arr, _count) {
    var splitted = [];
    var result = [];
    _arr.forEach(function(item, idx) {
      if ((idx + 1) % _count === 0) {
        splitted.push(item);
        result.push(splitted);
        splitted = [];
      } else {
        splitted.push(item);
      }
    });
    return result;
  }
  

	