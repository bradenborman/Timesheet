
var now = new Date();
var start = new Date(now.getFullYear(), 0, 0);
var diff = now - start;
var oneDay = 1000 * 60 * 60 * 24;
var day = Math.floor(diff / oneDay);
checkDay()

function checkDay() {
	
	if(day == localStorage.getItem("date")) {
		
	}else{
		clearLocalStorage()
	}
	
	if (typeof(Storage) !== "undefined") {
		localStorage.setItem("date", day);
		localStorage.getItem("date")
	} else {
		alert("Sorry, your browser does not support Web Storage...Please use Google Chrome");
	}
}

function clearLocalStorage(){
    localStorage.clear();
}

//addToStorage(NAME, PHONE, ADDRESS, timeIn, timeOut, TIME_WORKED)
function addToStorage(NAME, PHONE, ADDRESS, timeIn, timeOut, TIME_WORKED) {
	var entry = { name: NAME, phone: PHONE, address: ADDRESS, timeIn: timeIn, timeOut: timeOut, timeWorked: TIME_WORKED };
	localStorage.setItem(NAME, JSON.stringify(entry));
}


for (var i = 0; i < localStorage.length; i++){
    if(localStorage.key(i) != "date"){
		var Person = JSON.parse(localStorage.getItem(localStorage.key(i)));
		PopulateTables(Person)
	}
		
}

function removeRowLocalStorage(key_value) {
	localStorage.removeItem(key_value);
}


function PopulateTables(PERSON) {
	
	var row = '<tr class="removable">' + 
		 '<td><input class="NAME_TXT" value="' + PERSON.name + '" type="text" /></td>' + 
		 '<td><input placeholder="With Areacode" class="PHONE_TXT" onblur="validPhoneNumber(this)" value="' + PERSON.phone + '" type="text" /></td>' + 
		 '<td><input class="ADDRESS_TXT" value="' + PERSON.address + '" type="text" /></td>' + 
		 '<td><input class="TIME_IN_TXT" value="' + PERSON.timeIn + '" type="time" /></td>' + 
		 '<td><input class="TIME_OUT_TXT" value="' + PERSON.timeOut + '" required type="time" /></td> ' + 
		 '<td><input class="HOURS_TXT" value="' + PERSON.timeWorked + '" readonly required type="text" /></td>' + 
		 '</tr>'
		 
		 if(PERSON.name != "")
			$('#order').append(row);

}



















