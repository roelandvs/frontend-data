
//endpoint naar SPECIFICATIES PARKEERGEBIED
const endpoint = "https://opendata.rdw.nl/resource/b3us-f26s.json";
const specificColumn = "areaid";

getData(endpoint) 
	.then(data => {
		console.log('all data: ', data);
		const testjeee = data.map(result => result[specificColumn]);
		console.log('areaID: ', testjeee);
	})

async function getData(url){
    const response = await fetch(url);
    const data = await response.json();
    return data;
};


//zonder async
// function getData(url) {
// 	return fetch(url); 
// };