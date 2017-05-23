/* Author: Philip Walker
* Student number: 21570496
*/
/* Creates a function 'lastDate' that display the last date modified.
*/
function lastDate() {
   	var newDate = document.lastModified;
	change = newDate.fontcolor("cyan"); 
    document.getElementById("date").innerHTML = change;
}

