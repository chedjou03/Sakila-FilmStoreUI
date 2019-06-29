
function showCountryDataGrid()
{

	var URL = "http://localhost:8080/filmStore/api/countries";
	
	var countryDataSource = new DevExpress.data.CustomStore({
		
		key:"countryId",
		
		load:function(){
			//return sendRequest(URL);
			 return $.getJSON(URL);
		},
		
		insert:function(values){
			var newJsonCountry = buildNewCountryJson(values);
			return sendRequest(URL,"POST",newJsonCountry);
		},
		
		update: function(key,values){
			var countryUpdatedJson = buildUpdatedCountryJson(key,values);
			return sendRequest(URL,"PUT",countryUpdatedJson)
		},
		
		remove:function(key){
			URL = URL+"/"+key;
			return sendRequest(URL,"DELETE")
		}
		
	});
	
	
	$("#countryGridContainer").dxDataGrid({
        dataSource: countryDataSource,
        repaintChangesOnly: true,
        showBorders: true,
        editing: {
            refreshMode: "reshape",
            mode: "form",
            allowAdding: true,
            allowUpdating: true,
            allowDeleting: true
        },
        scrolling: {
            mode: "virtual"
        },
        columns:[
        	{
        		dataField:"countryName",
        		caption:"Country Name"
        	},
        	{
        		dataField:"countryLastUpdate",
        		caption:"Last Updated"
        	}
        ],
        onRowUpdating: function(e) {
           
        }
    });
}

function sendRequest(url, method, data) {
    var d = $.Deferred();

    method = method || "GET";
    
    $.ajax(url, {
        method: method || "GET",
        data: data,
        cache: false,
        contentType: "application/json",
        xhrFields: { withCredentials: true }
    }).done(function(result) {
        d.resolve(method === "GET" ? result.data : result);
    }).fail(function(xhr) {
        d.reject(xhr.responseJSON ? xhr.responseJSON.Message : xhr.statusText);
    });

    return d.promise();
}

function buildUpdatedCountryJson(key,values)
{
	var countryUpdated = {"countryId" : key,"countryName" : values['countryName'] };
	var countryUpdatedJson = JSON.stringify(countryUpdated);
	return countryUpdatedJson;
}

function buildNewCountryJson(values)
{
	return JSON.stringify(values);
}
