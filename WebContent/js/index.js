$(document).ready(function(){

	
    $("#countryMenuItem").click(function(){
    	var date1 = 1525730400000;
    	var date = new Date(parseInt(("/Date(1525730400000)/").match(/\d+/)[0]));
    	var date2 = parseJsonDate(date1);
    	console.log(date);
    	console.log(date2);
    	showCountryDataGrid();
    });
    
    $("#clientMenuItem").click(function(){
    	showClienDataGrid();
    });
    
});

function parseJsonDate(jsonDate) {
    var offset = new Date().getTimezoneOffset() * 60000;
    var parts = /\/Date\((-?\d+)([+-]\d{2})?(\d{2})?.*/.exec(jsonDate);
    if (parts[2] == undefined) parts[2] = 0; 
    if (parts[3] == undefined) parts[3] = 0; 
    return new Date(+parts[1] + offset + parts[2]*3600000 + parts[3]*60000); 
}