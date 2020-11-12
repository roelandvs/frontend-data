
//endpoint naar SPECIFICATIES PARKEERGEBIED + limit van 2000 items
// stads naam in dataset = data.results[0].components 
import { 
	select,
	scaleLinear,
	max,
	scaleBand,
	axisLeft,
	axisBottom
 } from 'd3';

import { geoAPI } from './geodata.js';

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
const geoData = geoAPI;
// console.log(geoData);

//d3 variables
const d3 = require("d3");
const svg = d3.select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data => {
	const margin = { top: 20, right: 20, bottom: 60, left: 150 };
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	const xScale = scaleLinear()
		.domain([0, max(data, row => row.capacity)])
		.range([0, innerWidth]);

	const yScale = scaleBand()
		.domain(data.map(row => row.city))
		.range([0, innerHeight])
		.padding(0.2)

	//adds margin to group g
	const g = svg.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top})`);

	//call is a function that takes a function, and envokes it with the selection before the .call
	//y-as
	g.append('g').call(axisLeft(yScale))
		.selectAll('.tick line')
			.remove();

	//x-as
	g.append('g').call(axisBottom(xScale))
		.attr('transform', `translate(0, ${innerHeight})`)
		.append('text')
			.attr('y', 50)
			.attr('x', innerHeight / 2 + 80)
			.attr('class', 'label')
			.text('Aantal parkeerplaatsen')


	g.selectAll('rect').data(data)
		.enter().append('rect')
			.attr('y', row => yScale(row.city))
			.attr('width', row => xScale(row.capacity))
			.attr('height', yScale.bandwidth())
			.attr('fill', 'coral')
			.attr('class', 'rect')

	g.append('text')
};

getData(endpoints)
	.then(response => makeJSON(response))
	.then(RDWData => filterEntries(RDWData, usefullColumns))
	.then(RDWFilteredEntries => mergeObjects(RDWFilteredEntries))
	.then(RDWSingleObject => filterGeoLocations(RDWSingleObject))
	.then(RDWFilteredData => mergeGeoData(RDWFilteredData, geoData))
	.then(mergedAllData => filterAllEntries(mergedAllData))
	.then(iets => mergeSameObject(iets, 'city'))
	// .then(d3Data => render(d3Data))
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

function mergeObjects(dataset) {
	let accessDataset = dataset[0];
	let locationDataset = dataset[1];

	return accessDataset.map(entry => {
		//vergelijkt id's van beide datasets, en als deze overeenkomen bewaard hij ze
		let locationItem = locationDataset.find(item => item.areaid === entry.areaid);

		// het gaat hier fout, de map returnt in 2 volgordes
		// console.log(entry);

		if (locationItem) {
			const mergedItem = {...entry, ...locationItem};
			return mergedItem;
		}

	}).filter(entry => entry !== undefined);
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
		}

		let cleanObject = {
			city: city,
			geometry: item.geometry,
			geo: item.geo,
			disabledaccess: item.disabledaccess,
			capacity: +item.capacity,
			// road: item.cityInfo.road,
			postcode: item.cityInfo.postcode,
			state: item.cityInfo.state,
		};

		return cleanObject;
	}).filter(item => item.disabledaccess == 1 && item.capacity != 0);
};

function mergeSameObject(dataset, key) {
	let uniqueArray = [{}];
	let doubleArray = [];
	// console.log(dataset)
	dataset.forEach(entry => {		
		// console.log(entry[key]);
		// uniqueArray.forEach(item => {
		// 	if (uniqueArray.length === 1) {
		// 		uniqueArray.push(entry);
		// 	} else if (entry[key] != item[key]) {
		// 		uniqueArray.push(entry);
		// 		console.log('unique');
		// 	} else if (entry[key] === item[key]) {
		// 	 	doubleArray.push(entry);
		// 		console.log('double');
		// 	} 
		// })
	})
	// console.log(uniqueArray);
	// console.log(doubleArray);
}


