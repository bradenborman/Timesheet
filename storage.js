
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
function addToStorage(NAME, PHONE, ADDRESS, timeIn, timeOut, TIME_WORKED, EMAIL) {
	var entry = { name: NAME, phone: PHONE, address: ADDRESS, timeIn: timeIn, timeOut: timeOut, timeWorked: TIME_WORKED, email: EMAIL};
	localStorage.setItem(NAME, JSON.stringify(entry));
}


for (var i = 0; i < localStorage.length; i++){
    if(localStorage.key(i) == "date" || localStorage.key(i) == "TIME EDITS" ){

	} else {
		var Person = JSON.parse(localStorage.getItem(localStorage.key(i)));
		PopulateTables(Person)
	}
		
}

function removeRowLocalStorage(key_value) {
	localStorage.removeItem(key_value);
}


function PopulateTables(PERSON) {
	var OUT
	
	if(PERSON.timeOut == "")
		OUT = '<div class="OUT_BLOCK"><td><i class="fa fa-check-circle"></i><input style="display: none;" class="TIME_OUT_TXT"  required type="time" readonly /></div></td> '
	else 
		OUT = '<div class="OUT_BLOCK"><td><i style="display: none;" class="fa fa-check-circle"></i><input class="TIME_OUT_TXT" value="' + PERSON.timeOut + '"  required type="time" readonly /></div></td> '
		 
	
	
	var row = '<tr style="background-color: #ebfce8;" class="removable">' + 
		 '<td><input class="NAME_TXT" value="' + PERSON.name + '" type="text" /></td>' + 
		 '<td><input placeholder="With Areacode" class="PHONE_TXT" onblur="validPhoneNumber(this)" value="' + PERSON.phone + '" type="text" /></td>' + 
		 '<td><input class="ADDRESS_TXT" value="' + PERSON.address + '" type="text" /></td>' + 
		 '<td><input class="EMAIL_TXT" value="' + PERSON.email + '" type="email" /></td>' +
		 '<td><input class="TIME_IN_TXT" value="' + PERSON.timeIn + '" type="time" /></td>' + 
		 OUT + 
		 '<td><input class="HOURS_TXT" value="' + PERSON.timeWorked + '" readonly required type="text" /></td>' + 
		 '</tr>'
		 
		 if(PERSON.name != "")
			$('#order').append(row);

}














