
//endpoint naar SPECIFICATIES PARKEERGEBIED + limit van 2000 items
// const endpoint = "https://opendata.rdw.nl/resource/b3us-f26s.json?$limit=2000";
// const endpointTwo = "https://opendata.rdw.nl/resource/nsk3-v9n7.json?$limit=6500"; 
const endpoints = [
	"https://opendata.rdw.nl/resource/b3us-f26s.json?$limit=2000", 
	"https://opendata.rdw.nl/resource/nsk3-v9n7.json?$limit=7000"
];

const usefullColumns = [
	"areaid", 
	"capacity", 
	"disabledaccess", 
	"areageometryastext", 
	"areamanagerid"
];

//---- dit is om de API te testen 
import dotenv from 'dotenv'

fetchAPI('https://api.opencagedata.com/geocode/v1/json?q=51.921013802+4.534210677&key=' + process.env.API_KEY)
	.then(response => response.json())
	.then(data => console.log('data van API', data.results[0].components))

function fetchAPI(url) {
	return fetch(url);
};
// ----

getData(endpoints)
	.then(response => makeJSON(response))
	.then(RDWData => filterEntries(RDWData, usefullColumns))
	.then(RDWFilteredEntries => mergeObjects(RDWFilteredEntries))
	.then(RDWSingleObject => filterGeoLocations(RDWSingleObject))
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
	let accessDataset = dataSet[0];
	let locationDataset = dataSet[1];

	return accessDataset.map(entry => {
		//vergelijkt id's van beide datasets, en als deze overeenkomen bewaard hij ze
		let locationItem = locationDataset.find(item => item.areaid === entry.areaid);

		if (locationItem) {
			const mergedItem = {...entry, ...locationItem};

			// if (mergedItem.disabledaccess == 1) {
			// 	console.log('Inclusief disabledaccess: ', mergedItem);
			// }

			return mergedItem;
		}
	}).filter(entry => entry != undefined)
};

function filterGeoLocations(dataSet) {
	return dataSet.map(entry => {
		//RegEx is geschreven door Jonah Meijers
		const geoLocation = entry.areageometryastext.match(/\d+\.\d+/g);
		const longitude = geoLocation[0];
		const latitude = geoLocation[1];

		entry.areageometryastext = [longitude, latitude];
		return entry;
	})
};




