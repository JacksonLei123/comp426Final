var cities = ["Paris", "New Zealand", "London", "Tokyo", "Phuket"];

$('#cityName').autocomplete({
    source: cities,
    autoFocus: true
});

var firebaseConfig = {
    apiKey: "AIzaSyAhcDRlR3RBFEMtRjanuuDMDKqFHqjzJuU",
    authDomain: "comp426-19a60.firebaseapp.com",
    databaseURL: "https://comp426-19a60.firebaseio.com",
    projectId: "comp426-19a60",
    storageBucket: "comp426-19a60.appspot.com",
    messagingSenderId: "311446455287",
    appId: "1:311446455287:web:82692dda4340b7ae6f24f2"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

var location;
var initialCity;


$(document).ready(() => {
    auth.onAuthStateChanged(function(user) {
        if (user) {
       //     controller.signIn(user);
      //     $(".formContainer").replaceWith(x);
      //      $(".signOut").click(signOut);
            
            alert("Active user: " + user.email);
            const curr = auth.currentUser;
            console.log(curr.email);
          //location = db.collection("users").doc(curr.email).data.location;
            let docRef = db.collection("users").doc(curr.email);
            docRef.get().then(function(doc) {
            
                if (doc.exists) {
                 console.log("Document data:", doc.data());
                    
                    location = doc.data().location;
                 //   console.log(location);
                    let split = location.split("/");
                    console.log(split[0]);
                    initialCity = split[0];
                    
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
                
            }).then(async function() { 
                console.log(initialCity);
    const response = await axios({
        method: 'GET',
        url: 'https://community-open-weather-map.p.rapidapi.com/forecast/daily',
        params: {q: initialCity, cnt: '10', units: 'imperial'},
        headers: {
            'x-rapidapi-key': '77a0f8f416mshc4af7c3543d5f9bp1a812fjsn303daa15f8cc',
            'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
        }
    });
    var cityName = response.data.city.name;
    var country = response.data.city.country;
    $('#weatherTitle').append(`<h1 class="title is-2"><center>10-Day Weather - ${cityName}, ${country}</center></h1><br>`);
    for (var i = 0; i < 5; i++) {
        let weath = response.data.list[i].weather[0].description;
        let min = "Low: " + response.data.list[i].temp.min + "°F";
        let max = "High: " + response.data.list[i].temp.max + "°F";
        let humidity = "Humidity: " + response.data.list[i].humidity + "%";
        $('#weather1').append(`<div class="column weatherDay"><center>
        <h1 class="title is-3">DAY ${i+1}</h1><br>
        <div class="is-size-5">
        ${weath}<br>
        ${min}<br>
        ${max}<br>
        ${humidity}
        </div>
        </center></div>`);
    }

    for (var i = 5; i < 10; i++) {
        let weath = response.data.list[i].weather[0].description;
        let min = "Low: " + response.data.list[i].temp.min + "°F";
        let max = "High: " + response.data.list[i].temp.max + "°F";
        let humidity = "Humidity: " + response.data.list[i].humidity + "%";
        $('#weather2').append(`<div class="column weatherDay"><center>
        <h1 class="title is-3">DAY ${i+1}</h1><br>
        <div class="is-size-5">
        ${weath}<br>
        ${min}<br>
        ${max}<br>
        ${humidity}
        </div>
        </center></div>`);
    }
            });
            
      
        } else {
       //     controller.signOut();
           // $('.user').replaceWith(x);
            alert("No active user");
           
        }
    
      })
      
})

export async function getWeather() {
   // console.log("hey");
    event.preventDefault();
    $('#weather1').empty();
    $('#weather2').empty();
    $('#weatherTitle').empty();
    var city = $("#cityName").val();
    console.log(city);
    const response = await axios({
        method: 'GET',
        url: 'https://community-open-weather-map.p.rapidapi.com/forecast/daily',
        params: {q: city, cnt: '10', units: 'imperial'},
        headers: {
            'x-rapidapi-key': '77a0f8f416mshc4af7c3543d5f9bp1a812fjsn303daa15f8cc',
            'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
        }
    });
    var cityName = response.data.city.name;
    var country = response.data.city.country;
    $('#weatherTitle').append(`<h1 class="title is-2"><center>10-Day Weather - ${cityName}, ${country}</center></h1><br>`);
    for (var i = 0; i < 5; i++) {
        let weath = response.data.list[i].weather[0].description;
        let min = "Low: " + response.data.list[i].temp.min + "°F";
        let max = "High: " + response.data.list[i].temp.max + "°F";
        let humidity = "Humidity: " + response.data.list[i].humidity + "%";
        $('#weather1').append(`<div class="column weatherDay"><center>
        <h1 class="title is-3">DAY ${i+1}</h1><br>
        <div class="is-size-5">
        ${weath}<br>
        ${min}<br>
        ${max}<br>
        ${humidity}
        </div>
        </center></div>`);
    }

    for (var i = 5; i < 10; i++) {
        let weath = response.data.list[i].weather[0].description;
        let min = "Low: " + response.data.list[i].temp.min + "°F";
        let max = "High: " + response.data.list[i].temp.max + "°F";
        let humidity = "Humidity: " + response.data.list[i].humidity + "%";
        $('#weather2').append(`<div class="column weatherDay"><center>
        <h1 class="title is-3">DAY ${i+1}</h1><br>
        <div class="is-size-5">
        ${weath}<br>
        ${min}<br>
        ${max}<br>
        ${humidity}
        </div>
        </center></div>`);
    }
    
}

$(function() {
//    initialWeather();
    $(document).on("click", ".searchCity", getWeather);
});