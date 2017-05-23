/* Author: Philip Walker
* Student number: 21570496
*/
/* Creates a function that display city of different countries when the country dropdown list is selected.
* This is done by creating seperate arrays of cities with respect to their country and then returning the values chosen.
*/
function populate(co,ci) {
	this.co = co;
	this.ci = ci;
	var co = document.getElementById(co);
	var ci = document.getElementById(ci);
	ci.innerHTML = "";
	if(co.value == "Australia") {
		var cityArray = ["|","melbourne|Melbourne","sydney|Sydney","brisbane|Brisbane","adelaide|Adelaide","hobart|Hobart","perth|Perth"];
	}
	else if(co.value == "New Zealand") {
		var cityArray = ["|","auckland|Auckland","wellignton|Wellignton","christchurch|Christchurch"];
	}
	for(var option in cityArray) {
		var newCity = document.createElement("option");
		var pair = cityArray[option].split("|");
		newCity.value = pair[0];
		newCity.innerHTML = pair[1];
		ci.options.add(newCity);
	}
	return "co.value, ci.value";
}












