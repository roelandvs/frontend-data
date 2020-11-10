
//endpoint naar SPECIFICATIES PARKEERGEBIED + limit van 2000 items
// stads naam in dataset = data.results[0].components 
import { data } from './geodata.js'

const endpoints = [
	"https://opendata.rdw.nl/resource/b3us-f26s.json?$limit=2000", 
	"https://opendata.rdw.nl/resource/nsk3-v9n7.json?$limit=7000"
];

const usefullColumns = [
	"areaid", 
	"capacity", 
	"disabledaccess", 
	"areageometryastext", 
];

//geoData is data I saved locally that I reveived from an API
const geoData = data;

getData(endpoints)
	.then(response => makeJSON(response))
	.then(RDWData => filterEntries(RDWData, usefullColumns))
	.then(RDWFilteredEntries => mergeObjects(RDWFilteredEntries))
	.then(RDWSingleObject => filterGeoLocations(RDWSingleObject))
	.then(RDWFilteredData => mergeGeoData(RDWFilteredData, geoData))
	.then(allData => filterAllEntries(allData))
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

function mergeObjects(dataset) {
	let accessDataset = dataset[0];
	let locationDataset = dataset[1];

	return accessDataset.map(entry => {
		//vergelijkt id's van beide datasets, en als deze overeenkomen bewaard hij ze
		let locationItem = locationDataset.find(item => item.areaid === entry.areaid);

		if (locationItem) {
			const mergedItem = {...entry, ...locationItem};
			return mergedItem;
		}

	}).filter(entry => entry != undefined);
};

function filterGeoLocations(dataset) {
	return dataset.map(entry => {
		//RegEx is geschreven door Jonah Meijers
		const geoLocation = entry.areageometryastext.match(/\d+\.\d+/g);
		const lng = +geoLocation[0];
		const lat = +geoLocation[1];

		entry.geo = [lat, lng];
		return entry;
	});
};

function mergeGeoData(RDWdataset, geoDataset) {
	return RDWdataset.reduce((acc, cur, i) => {
   		const mergedItem = {...cur, ...geoDataset[i]};
   		acc.push(mergedItem);
   		return acc;
	}, []);
};

function filterAllEntries(dataset) {
	return dataset.map(item => {
		let city;

		if(item.cityInfo.town) {
			city = item.cityInfo.town;
		} else if(item.cityInfo.village) {
			city = item.cityInfo.village;
		} else {
			city = item.cityInfo.city;
		};

		let cleanObject = {
			city: city,
			disabledaccess: item.disabledaccess,
			capacity: +item.capacity,
			road: item.cityInfo.road,
			postcode: item.cityInfo.postcode,
			state: item.cityInfo.state
		};

		return cleanObject;
	}).filter(item => item.disabledaccess == 1);
};


