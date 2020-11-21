// var cities = ["Paris", "New Zealand", "Bora Bora", "London", "Tokyo", "Phuket"];

export async function logCity() {
    console.log("hey");
}

export async function getWeather() {
   // console.log("hey");
    event.preventDefault();
    var city = $("#cityName").val();
    console.log(city);
    const response = await axios({
        method: 'GET',
        url: 'https://community-open-weather-map.p.rapidapi.com/find',
        params: {q: city, units: 'imperial'},
        headers: {
            'x-rapidapi-key': '77a0f8f416mshc4af7c3543d5f9bp1a812fjsn303daa15f8cc',
            'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
        }
    });
    let weath = response.data.list[0].weather[0].description;
    $('#weather').replaceWith(`<div id="weather">${weath}</div>`);
}



$(function() {
    $(document).on("click", ".searchCity", getWeather);
});