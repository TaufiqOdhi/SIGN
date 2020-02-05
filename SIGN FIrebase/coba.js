function splitStr(str) {

	// Function to split string
	var string = str.split(" ");
  var stringEdit, i;

  stringEdit = string[0];
  for(i=1; i<string.length; i++){
    stringEdit += "%20" + string[i];
  }

	console.log(stringEdit);
}

// Initialize string
var str = "HORIKITA MANABU SUZUNE";

// Function call
splitStr(str);
