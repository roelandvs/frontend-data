
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

const oogKleurAntwoord = surveyData.map(answer => answer.oogKleur.toUpperCase().replace(/ /g, ''));
//.map maakt een nieuwe array aan, dmv een callback naar de originele array waarbij alleen de aangegeven values in komen

let juisteHexWaardes = [];
let onjuisteHexWaardes = [];

for (kleurHex of oogKleurAntwoord) {
	if (kleurHex.startsWith('#') === true && kleurHex.length === 7 && parseInt(kleurHex.slice(1, 3), 16) <= 255) {
		//parseInt gebruikt hier een haxadecimale base. deze gaat tot 16, de radix is dus 16. Parseint zet de hex code om tot een geheel getal.
		//Als dit dus een correcte hex is zonder '#' dan is dit getal. Gebruik parseInt was tip van Jonah
		//Dit zou je beter kunnen checken met regEx, maar heb nu al dit
		juisteHexWaardes.push(kleurHex);
	} else if (kleurHex.length === 6 && parseInt(kleurHex.slice(0, 2), 16) <= 255) {
		juisteHexWaardes.push('#'.concat(kleurHex));
	} else if (kleurHex.includes('RGB') === true) { 
		//regEx die alle getallen uit kleurHex haalt. \d = digit, []wat daarna mag komen, *herhaal eeuwig totdat '[]'' niet klopt.
		let RgbKleur = kleurHex.match(/(\d[\d]*)/g);
		RgbKleur = RgbKleur.map(kleur => Number(kleur))

		juisteHexWaardes.push(rgbToHex(RgbKleur[0], RgbKleur[1], RgbKleur[2]));
	} else {
		onjuisteHexWaardes.push(kleurHex);
	};
};

//https://www.w3docs.com/snippets/javascript/how-to-convert-rgb-to-hex-and-vice-versa.html between "----"
//----
function componentToHex(c) {
  let hex = c.toString(16);

  if (hex.length == 1) {
  	hex = "0" + hex;
  } else {
  	hex;
  };

  return hex.toUpperCase();
};

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};
//-----

console.log('juiste waardes:', juisteHexWaardes);
console.log('onjuiste waardes:', onjuisteHexWaardes);



