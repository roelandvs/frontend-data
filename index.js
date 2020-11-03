
//endpoint naar SPECIFICATIES PARKEERGEBIED + limit van 2000 items
// const endpoint = "https://opendata.rdw.nl/resource/b3us-f26s.json?$limit=2000";
// const endpointTwo = "https://opendata.rdw.nl/resource/nsk3-v9n7.json?$limit=6500"; 
const endpoints = [
	getData("https://opendata.rdw.nl/resource/b3us-f26s.json?$limit=2000"), 
	getData("https://opendata.rdw.nl/resource/nsk3-v9n7.json?$limit=6500")
];

const specificColumn = "areaid";
const usefullColumns = ["areaid", "capacity", "disabledaccess"];

Promise.all(endpoints)
	.then(response => makeJSON(response))
	.then(RDWData => filterObject(RDWData[0], usefullColumns))
	// .then waarbij de objecten worden samengevoegd
	.then(console.log)

//returnt een promise van de url
function getData(url) {
    return fetch(url);
};

//makes both endpoint into JSON. This returns a promise again, that's why promise.all is used. 
function makeJSON(response) {
	return Promise.all(response.map(response => response.json()));
};

//returns objects with only the usefull values. It makes objects with only the keys I use
function filterObject(RDWArray, columnNames) {
	return RDWArray.map(entry => {
		let newEntry = {};
		columnNames.forEach(column => newEntry[column] = entry[column]);
		return newEntry;
	})
};

//function waarbij de objecten samengevoegd worden