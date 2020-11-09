
//endpoint naar SPECIFICATIES PARKEERGEBIED + limit van 2000 items
// stads naam in dataset = data.results[0].components 

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

import dotenv from 'dotenv'

getData(endpoints)
	.then(response => makeJSON(response))
	.then(RDWData => filterEntries(RDWData, usefullColumns))
	.then(RDWFilteredEntries => mergeObjects(RDWFilteredEntries))
	.then(RDWSingleObject => filterGeoLocations(RDWSingleObject))
	.then(RDWFilteredObject => {
		// createAPIUrl(RDWFilteredObject);
		return RDWFilteredObject;
	})
	// .then(console.log)

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

function filterGeoLocations(dataset) {
	return dataset.map(entry => {
		//RegEx is geschreven door Jonah Meijers
		const geoLocation = entry.areageometryastext.match(/\d+\.\d+/g);
		const lng = geoLocation[0];
		const lat = geoLocation[1];

		entry.lng = lng;
		entry.lat = lat;
		return entry;
	})
};

//----- code to get name from API

// delayed forEach loop from https://travishorn.com/delaying-foreach-iterations-2ebd4b29ad30
function createAPIUrl(dataset) {
	dataset.forEach((entry, i) => {
		setTimeout(() => {
			const geoData = entry.lat + '+' + entry.lng;
			const APIUrl = 'https://api.opencagedata.com/geocode/v1/json?q=' + geoData + '&key=' + process.env.API_KEY;
			fetchAPI(APIUrl);
		}, i * 2000)
	})
};

var allAPIData = [];

function fetchAPI(url) {
	// console.log('url:', url);
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

//-----



