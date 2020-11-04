
//endpoint naar SPECIFICATIES PARKEERGEBIED + limit van 2000 items
// const endpoint = "https://opendata.rdw.nl/resource/b3us-f26s.json?$limit=2000";
// const endpointTwo = "https://opendata.rdw.nl/resource/nsk3-v9n7.json?$limit=6500"; 
const endpoints = [
	"https://opendata.rdw.nl/resource/b3us-f26s.json?$limit=2000", 
	"https://opendata.rdw.nl/resource/t5pc-eb34.json"
];

const usefullColumns = ["areaid", "capacity", "disabledaccess", "areadesc"];

getData(endpoints)
	.then(response => makeJSON(response))
	.then(RDWData => filterEntries(RDWData, usefullColumns))
	// .then(RDWFilteredData => console.log(RDWFilteredData[0]))
	.then(console.log)

//returnt de url met een promise.all 
function getData(urls) {
	const RDWDatasets = urls.map(url => fetch(url));
    return Promise.all(RDWDatasets);
};

//makes both endpoint into JSON. This returns a promise again, that's why promise.all is being used. 
function makeJSON(response) {
	return Promise.all(response.map(response => response.json()));
};

//returns objects with only the usefull values. It makes objects with only the keys I use
function filterEntries(RDWArray, columnNames) {
	return RDWArray.map(endpoint => {
		return endpoint.map(entry => {
			//Jonah Meijers heeft me geholpen met deze code
			//-----
			let newEntry = {};

			columnNames.forEach(column => {
				if (entry[column]) {
					newEntry[column] = entry[column];
				}
			})
			
			return newEntry;
			//-----
		})
	});
};

function mergeObjects(dataSet) {
	dataSet.map(endpoint => {
		// console.log('endpoint: ', endpoint);

		endpoint.map(entry => {
			// console.log('entry', entry.areaid);
		})

	})
};

//function waarbij de objecten samengevoegd worden