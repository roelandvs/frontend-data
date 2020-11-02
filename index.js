
//endpoint naar SPECIFICATIES PARKEERGEBIED + limit van 2000 items
const endpoint = "https://opendata.rdw.nl/resource/b3us-f26s.json?$limit=2000";
// const endpointTwo = "https://opendata.rdw.nl/resource/nsk3-v9n7.json?$limit=6500"; 
const specificColumn = "areaid";

getData(endpoint) 
	.then(response => {
		//returns json() from response
		return response.json();
})
	.then(data => {
		console.log('all data: ', data);
		areaIdArray = filterColumn(data, specificColumn);
		console.log('areaID: ', areaIdArray);
})

//returnt een promise van de url
function getData(url){
    return fetch(url);
};

//returnt 1 specifieke columnNaam
function filterColumn(RDWArray, columnName) {
	return RDWArray.map(item => item[columnName])
};