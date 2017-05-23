/* Author: Philip Walker
* Student number: 21570496
*/
/* Verifies that the password entered is identical to the verification password.
*/
function verifyPW() {
	if (document.getElementById("pw").value == document.getElementById("vpw").value) {
		return true;
	}
	else 
		alert("passwords do not match");
		return false;
	}

/* Verifies that the password contains at least one number, one lowercase letter and one uppercase letter.
*/	
function validatepassword() {
		var valPW = document.getElementById("pw").value;
    	var patternPW = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
    	var testPW = patternPW.test(valPW);
    	if (testPW == false) {
    		alert("Invalid password. You need at least one number, one lowercase letter and one uppercase letter.");
    		return false;
    }    
    	else {
    		return true;
    	}
}