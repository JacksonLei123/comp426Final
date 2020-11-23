
var cities = ["Paris", "New Zealand", "Maldives", "London", "Tokyo", "Phuket", "Banff"];

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

// let debounce = function() {
//     var timer;
//     return function() {
//       var args = [].slice.call(arguments);
//       var context = this;
//       if (timer) {
//         window.clearTimeout(timer);
//       }
//       timer = window.setTimeout(function() {
//         fn.apply(context, args);
//       }, delay);
//     };
//   };

// let querySourceData = function (request, response) {
//     $.ajax({
//        url: '/your_api',
//        success: function(data = []) {
//           response(data);
//        },
//        error: function() {
//           response([]);
//        }
// });




$(document).ready(() => {
    auth.onAuthStateChanged(function(user) {
        if (user) {
       //     controller.signIn(user);
      //     $(".formContainer").replaceWith(x);
      //      $(".signOut").click(signOut);
            
            alert("Active user: " + user.email);
            const curr = auth.currentUser;
            console.log(curr.email);
            var isTaken;
            let docRef = db.collection("users").doc(curr.email);
            docRef.get().then(function(doc) {
            
                if (doc.exists) {
                 console.log("Document data:", doc.data());
                    
                    isTaken = doc.data().quizTaken
                    console.log(isTaken);
                    
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
                
            }).then(async function() { 
                if (isTaken) {
                    $('#ifTaken').append(`<button class="button is-dark" id="ogWeather">View My Destination</button><br><br>`)
                }
            });
            
            
      
        } else {
       //     controller.signOut();
           // $('.user').replaceWith(x);
            alert("No active user");
           
        }
    
      })
      
})

export async function initialWeather() {
    $('#weather1').empty();
    $('#weather2').empty();
    $('#weatherTitle').empty();
    auth.onAuthStateChanged(function(user) {
        if (user) {
       //     controller.signIn(user);
      //     $(".formContainer").replaceWith(x);
      //      $(".signOut").click(signOut);
            
            const curr = auth.currentUser;
            console.log(curr.email);
          //location = db.collection("users").doc(curr.email).data.location;
          let docRef = db.collection("users").doc(curr.email);
            docRef.get().then(function(doc) {
            
                if (doc.exists) {
                 console.log("Document data:", doc.data());
                    
                    location = doc.data().location;
                    let split = location.split("/");
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
                $('#weatherTitle').append(`<h1 class="title is-2" style="font-family: 'Poppins', sans-serif"><center>10-Day Weather - ${cityName}, ${country}</center></h1><br>`);
                for (var i = 0; i < 5; i++) {
                    let weath = response.data.list[i].weather[0].description;
                    let min = "Low: " + response.data.list[i].temp.min + "°F";
                    let max = "High: " + response.data.list[i].temp.max + "°F";
                    let humidity = "Humidity: " + response.data.list[i].humidity + "%";
                    $('#weather1').append(`<div class="column weatherDay"><center>
                    <h1 class="title is-3" style="font-family: 'Poppins', sans-serif">DAY ${i+1}</h1><br>
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
        <h1 class="title is-3" style="font-family: 'Poppins', sans-serif">DAY ${i+1}</h1><br>
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
    
}

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
    $('#weatherTitle').append(`<h1 class="title is-2" style="font-family: 'Poppins', sans-serif"><center>10-Day Weather - ${cityName}, ${country}</center></h1><br>`);
    for (var i = 0; i < 5; i++) {
        let weath = response.data.list[i].weather[0].description;
        let min = "Low: " + response.data.list[i].temp.min + "°F";
        let max = "High: " + response.data.list[i].temp.max + "°F";
        let humidity = "Humidity: " + response.data.list[i].humidity + "%";
        $('#weather1').append(`<div class="column weatherDay"><center>
        <h1 class="title is-3" style="font-family: 'Poppins', sans-serif">DAY ${i+1}</h1><br>
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
        <h1 class="title is-3" style="font-family: 'Poppins', sans-serif">DAY ${i+1}</h1><br>
        <div class="is-size-5">
        ${weath}<br>
        ${min}<br>
        ${max}<br>
        ${humidity}
        </div>
        </center></div>`);
    }
    
}


let querySourceData = function(request, response) {
    
    $.ajax(settings).done(function(response) {
        console.log(response);
        return response;
    })

    // $.ajax({
    //    url: 'https://andruxnet-world-cities-v1.p.rapidapi.com/',
    //    success: function(data = []) {
    //       response(data);
    //    },
    //    error: function() {
    //       response([]);
    //    }
    // });

}

let debounce = function(fn, delay) {
    var timer;
    return function() {
      var args = [].slice.call(arguments);
      var context = this;
      if (timer) {
        window.clearTimeout(timer);
      }
      timer = window.setTimeout(function() {
        fn.apply(context, args);
      }, delay);
    };
  };

  const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://andruxnet-world-cities-v1.p.rapidapi.com/?query=paris&searchby=city",
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "43400b8ec8mshb4369054fa959f0p158ac2jsn93dac0c502b3",
		"x-rapidapi-host": "andruxnet-world-cities-v1.p.rapidapi.com"
	}
};

$(function() {
    
    
    initialWeather();
    $(document).on("click", ".searchCity", getWeather);
    $(document).on("click", "#ogWeather", initialWeather);

    // $('#cityName').autocomplete({

    //     source: querySourceData,

    // });
    
    // debouncing 
    let array = [];
    $('#cityName').keypress(async function() {
        let value = $('#cityName').val();
        const result = await axios({
            method: 'GET',
            url: 'https://andruxnet-world-cities-v1.p.rapidapi.com/',
            params: {query: value, searchby: 'city'},
            headers: {
                'x-rapidapi-key': '43400b8ec8mshb4369054fa959f0p158ac2jsn93dac0c502b3',
                'x-rapidapi-host': 'andruxnet-world-cities-v1.p.rapidapi.com'
            }
        });

        array = result.data;
               
    });

    console.log(array);
    $('#cityName').autocomplete({
        source: cities,
        delay: 200
    });


});