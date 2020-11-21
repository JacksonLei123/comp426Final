var cities = ["Paris", "New Zealand", "Bora Bora", "London", "Tokyo", "Phuket"];

export async function getWeather() {
    const response = await axios({
        method: 'get',
        url: 'https://api.weather.gov/gridpoints/AKQ/45,76/forecast/'
    });
    let weath = response.data.properties.periods[0].detailedForecast;
    $('#weather').replaceWith(`<p id="weather">${weath}</p>`);
}

$(function() {
    getWeather();
});