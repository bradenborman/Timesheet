var Row_values = {
	Name:'<td><input class="NAME_TXT" type="text" /></td>', 
	PhoneNumber: '<td><input class="PHONE_TXT" onblur="validPhoneNumber(this)" type="text" /></td>',
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
		 
		 
		$(document.body).on('dblclick', 'tr' ,function(){
			var count = $('#order tr').length
			
			
		//CHECK for if row has val
			
			if($(this).hasClass("removable") && count > 3) 
				$( this ).remove()			
			if($(this).hasClass("removable") && count == 4) 
				$("p").css("visibility", "hidden");
		});
		
		
		
         
         var row = '<tr class="removable">' + 
		 Row_values.Name + 
		 Row_values.PhoneNumber + 
		  Row_values.Address + 
		 Row_values.JobDescription + 
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
		 
		 
		 
		 $(document.body).on('blur', '.TIME_OUT_TXT' ,function(){
			var index = $('.TIME_OUT_TXT').index($(this))
			var timeOut = $(this).val()
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
				
			
			$('.HOURS_TXT:eq(' + index +')').val(hours + ":" + min)		
		
		});
		 
		 
		 
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
  var Headers = ["NAME", "PHONE #", "Address", "JOB", "TIME IN", "TIME OUT", "HRS"];
  var End = ["END of Sheet"]
 
	var CSVString = prepCSVRow(startOfFile, startOfFile.length, "");
 
	for(var x = 0; (x < data.length / 7); x++) {
		CSVString = prepCSVRow(Headers, Headers.length, CSVString);
		CSVString = prepCSVRow(getValues(x), 7, CSVString);
	}
	
 function getValues(y) {
	var name = ((y * 7) )
	var phone = ((y * 7) + 1)
	var address = ((y * 7) + 2)
	var job = ((y * 7) + 3)
	var _in = ((y * 7) + 4)
	var _out = ((y * 7) + 5)
	var hrs = ((y * 7) + 6)
           
	return [data[name], data[phone], data[address], data[job], data[_in], data[_out], data[hrs]]
				 
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
  

	