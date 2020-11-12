//The code in this file is code I wrote to fetch 1003 items from an API
//The data from the API is saved locally and is located in the geodata.js file

import dotenv from 'dotenv'
let allAPIData = [];

getData(endpoints)
	.then(response => makeJSON(response))
	.then(RDWData => filterEntries(RDWData, usefullColumns))
	.then(RDWFilteredEntries => mergeObjects(RDWFilteredEntries))
	.then(RDWSingleObject => filterGeoLocations(RDWSingleObject))
	.then(RDWFilteredObject => {
		createAPIUrl(RDWFilteredObject);
	})

// delayed forEach loop from https://travishorn.com/delaying-foreach-iterations-2ebd4b29ad30
function createAPIUrl(dataset) {
	console.log('het proces is gestart');
	dataset.forEach((entry, i) => {
		setTimeout(() => {
			const geoData = entry.lat + '+' + entry.lng;
			const APIUrl = 'https://api.opencagedata.com/geocode/v1/json?q=' + geoData + '&key=' + process.env.API_KEY;
			fetchAPI(APIUrl);
		}, i * 2000)
	})
};

function fetchAPI(url) {
	const APIAnswer = fetch(url);
	APIAnswer.then(answer => {
		turnToJSON(answer);
	});
};

function turnToJSON(answer) {
	const answerJSON = answer.json();
	answerJSON.then(answer => {
		let cityInfo = answer.results[0].components;
		let geometry = answer.results[0].geometry;

		allAPIData.push({
			cityInfo,
			geometry
		});

		if (allAPIData.length >= 1003) {
			console.log(allAPIData);
		}
	})
};

//Dit zijn functies die ik geschreven heb, maar die niet werken
// function filterGeoLocations(dataset) {
// 	return dataset.map(entry => {
// 		//RegEx is geschreven door Jonah Meijers
// 		const geoLocation = entry.areageometryastext.match(/\d+\.\d+/g);
// 		const lng = +geoLocation[0];
// 		const lat = +geoLocation[1];

// 		//In deze vorm omdat dit gelijk is aan de data uit de geo api
// 		entry.geometry = [lat, lng];
// 		// entry.geometry = {lat: lat, lng: lng};
// 		return entry;
// 	})
// };

// function mergeGeoData(RDWdataset, geoDataset) {
// 	geoDataset.map(entry => {
// 		entry.geo = [entry.geometry.lat, entry.geometry.lng];
// 		// console.log('geo', entry.geo);
// 		let RDWItem = RDWdataset.find(item => item.geometry === entry.geo);
// 		// console.log(RDWItem);
// 	})
// };
