
//endpoint naar SPECIFICATIES PARKEERGEBIED + limit van 2000 items
const endpoint = "https://opendata.rdw.nl/resource/b3us-f26s.json?$limit=2000";
// const endpointTwo = "https://opendata.rdw.nl/resource/nsk3-v9n7.json?$limit=6500"; 
const specificColumn = "areaid";
const usefullColumns = ["areaid", "capacity", "disabledaccess"];

getData(endpoint) 
	.then(response => response.json())
	.then(RDWData => filterObject(RDWData, usefullColumns))
	.then(console.log)

//returnt een promise van de url
function getData(url){
    return fetch(url);
};

//returnt 1 specifieke columnNaam
function filterColumn(RDWArray, columnName) {
	return RDWArray.map(item => item[columnName])
};

function filterObject(RDWArray, columnNames) {
	//returns objects with only the usefull values
	return RDWArray.map(entry => {
		let newEntry = {};
		columnNames.forEach(column => newEntry[column] = entry[column]);
		return newEntry;
	})
};