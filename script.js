var Row_values = {
	Name:'<td><input class="NAME_TXT" type="text" /></td>', 
	PhoneNumber: '<td><input placeholder="With Areacode" class="PHONE_TXT" onblur="validPhoneNumber(this)" type="text" /></td>',
	Address: '<td><input class="ADDRESS_TXT" type="text" /></td>',
	JobDescription: '<td><input style="display: none;" type="text" /><select class="size" required><option disabled selected value></option></select></td>', 
	TimeIn: '<td><input class="TIME_IN_TXT" type="time" /></td>',
	Timeout: '<td><input class="TIME_OUT_TXT"  required type="time" /></td> ',
	Hours: '<td><input class="HOURS_TXT" readonly required type="text" /></td>'
};
	
		 
		
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
        left: '33%',
		width: '33%',
		top: '20vh'
    });
}

function closeHelp() {
	$("#HELP").animate({
        left: '-300px',
		width: '50',
		top: '800px'
    });
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
 $(document.body).on('blur', '.TIME_OUT_TXT' ,function(){
			var index = $('.TIME_OUT_TXT').index($(this))
			newRow()
			doWork(index)	
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
 $(document.body).on('blur', '.NAME_TXT' ,function(){
			var index = $('.NAME_TXT').index($(this))
			doWork(index)	
});


 $(document.body).on('keydown', 'input' ,function(){
		clearTimeout(myVar)	 
		 myVar = setTimeout(function() { $("#helpBTN").focus(); }, 3500);
});








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
			
			var NAME = $('.NAME_TXT:eq(' + index +')').val()
			var PHONE = $('.PHONE_TXT:eq(' + index +')').val()
			var ADDRESS = $('.ADDRESS_TXT:eq(' + index +')').val()
			var TIME_WORKED = hours + ":" + min
			
			if(NAME != "")
				addToStorage(NAME, PHONE, ADDRESS, timeIn, timeOut, TIME_WORKED)			
				
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
  var Headers = ["NAME", "PHONE #", "Address", "TIME IN", "TIME OUT", "HRS"];
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
	var _in = ((y * loopFor) + 3)
	var _out = ((y * loopFor) + 4)
	var hrs = ((y * loopFor) + 5)
           
	return [data[name], data[phone], data[address], data[_in], data[_out], data[hrs]]
				 
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
  

	