// _ = helper functions
function _parseMillisecondsIntoReadableTime(timestamp) {
	//Get hours from milliseconds
	const date = new Date(timestamp * 1000);
	console.log(date);
	// Hours part from the timestamp
	const hours = '0' + date.getHours();
	// Minutes part from the timestamp
	const minutes = '0' + date.getMinutes();
	// Seconds part from the timestamp (gebruiken we nu niet)
	// const seconds = '0' + date.getSeconds();

	// Will display time in 10:30(:23) format
	return hours.substr(-2) + ':' + minutes.substr(-2); //  + ':' + s
}

// 5 TODO: maak updateSun functie
function updateSun(percentageday) {
	let sun = document.querySelector('.js-sun');
	sun.style.left = `${percentageday}%`;

	if (percentageday >= 50) {
		percentage = 100 - percentageday;
		sun.style.bottom = `${percentage}%`;
	} else {
		sun.style.bottom = `${percentage * 2}%`;
	}
}

// 4 Zet de zon op de juiste plaats en zorg ervoor dat dit iedere minuut gebeurt.
let placeSunAndStartMoving = (totalMinutes, sunrise, timezone) => {
	let sun = document.querySelector('.js-sun');
	let timeleft = document.querySelector('.js-time-left');
	let date = new Date();

	let sunalreadyup = date.getTime() / 1000 - sunrise;
	let suntimeleft = totalMinutes - sunalreadyup - timezone;

	let percentageday = (sunalreadyup / totalMinutes) * 100;

	let value = 0;

	if (suntimeleft < 0) {
		value = 0;
		document.querySelector('.js-time-left').innerHTML = value;
	} else {
		value = suntimeleft * 3600;
		document.querySelector('.js-time-left').innerHTML = value;
	}

	updateSun(percentageday);

	// In de functie moeten we eerst wat zaken ophalen en berekenen.
	// Haal het DOM element van onze zon op en van onze aantal minuten resterend deze dag.
	// Bepaal het aantal minuten dat de zon al op is.
	// Nu zetten we de zon op de initiële goede positie ( met de functie updateSun ). Bereken hiervoor hoeveel procent er van de totale zon-tijd al voorbij is.
	// We voegen ook de 'is-loaded' class toe aan de body-tag.
	// Vergeet niet om het resterende aantal minuten in te vullen.
	// Nu maken we een functie die de zon elke minuut zal updaten
	// Bekijk of de zon niet nog onder of reeds onder is
	// Anders kunnen we huidige waarden evalueren en de zon updaten via de updateSun functie.
	// PS.: vergeet weer niet om het resterend aantal minuten te updaten en verhoog het aantal verstreken minuten.
};

// 3 Met de data van de API kunnen we de app opvullen
let showResult = queryResponse => {
	console.log(queryResponse);
	let city = queryResponse.city;
	let cityName = city.name;
	let sunrise = city.sunrise;
	let sunset = city.sunset;
	let date = new Date();
	let now = date.getTime();
	let time = _parseMillisecondsIntoReadableTime(now / 1000);
	let sunrisetime = _parseMillisecondsIntoReadableTime(sunrise);
	let sunsettime = _parseMillisecondsIntoReadableTime(sunset);
	let timezone = city.timezone / 2;

	timebeween = sunset - sunrise;

	placeSunAndStartMoving(timebeween, sunrise, timezone);

	document.querySelector('.js-location').innerHTML = cityName;
	document.querySelector('.js-sun').setAttribute('data-time', time);
	document.querySelector('.js-sunrise').innerHTML = sunrisetime;
	document.querySelector('.js-sunset').innerHTML = sunsettime;
	// We gaan eerst een paar onderdelen opvullen
	// Zorg dat de juiste locatie weergegeven wordt, volgens wat je uit de API terug krijgt.
	// Toon ook de juiste tijd voor de opkomst van de zon en de zonsondergang.
	// Hier gaan we een functie oproepen die de zon een bepaalde positie kan geven en dit kan updaten.
	// Geef deze functie de periode tussen sunrise en sunset mee en het tijdstip van sunrise.
};

// 2 Aan de hand van een longitude en latitude gaan we de yahoo wheater API ophalen.
let getAPI = (lat, lon) => {
	url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=fdfef0241a979b4102798ff129a4f443&units=metric&lang=nl&cnt=1`;
	fetch(url)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			showResult(data);
		});
	// Eerst bouwen we onze url op
	// Met de fetch API proberen we de data op te halen.
	// Als dat gelukt is, gaan we naar onze showResult functie.
};

document.addEventListener('DOMContentLoaded', function() {
	// 1 We will query the API with longitude and latitude.
	getAPI(50.8027841, 3.2097454);
});
