
let surveyData = data;
// console.log("survey data:", surveyData);

// let oogKleurAntwoord = [];

//for loop
// for (var i = 0; i < surveyData.length; i++) {
// 	oogKleurAntwoord.push(surveyData[i].oogKleur);
// };

//for-in loop
// for (answer in surveyData) {
// 	oogKleurAntwoord.push(surveyData[answer].oogKleur);
// }
//for-in is een andere manier van een normale for loop schrijven waarbij 'let answer' dient als een vervanging van i

//for-of loop
// for (answer of surveyData) {
// 	oogKleurAntwoord.push(answer.oogKleur);
// }
//bij for-of dient answer niet als een cijfer die loopt door het object, maar weergeeft het gelijk de waardes, die je kunt aanpassen

const oogKleurAntwoord = surveyData.map(answer => answer.oogKleur.toUpperCase());
//.map maakt een nieuwe array aan, dmv een callback naar de originele array waarbij alleen de aangegeven values in komen

let juisteHexWaardes = [];
let onjuisteHexWaardes = [];

for (kleurHex of oogKleurAntwoord) {
	if (kleurHex.startsWith('#') === true && kleurHex.length === 7) {
		juisteHexWaardes.push(kleurHex);
	} else {
		onjuisteHexWaardes.push(kleurHex);
	};
}

for (kleurHex of onjuisteHexWaardes) {
	//parseInt gebruikt hier een haxadecimale base. deze gaat tot 16, de radix is dus 16. Parseint zet de hex code om tot een geheel getal.
	//Als dit dus een correcte hex is zonder '#' dan is dit getal. Gebruik parseInt was tip van Jonah
	if (kleurHex.length === 6 && parseInt(kleurHex.slice(0, 2), 16) <= 255) {
		onjuisteHexWaardes.pop(kleurHex);
		juisteHexWaardes.push('#'.concat(kleurHex));
		console.log(kleurHex);
	}
}

console.log("juiste waardes:", juisteHexWaardes);
// console.log("onjuiste waardes:", onjuisteHexWaardes);

