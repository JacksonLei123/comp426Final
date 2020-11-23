var cities = ["Paris", "New Zealand", "London", "Tokyo", "Phuket", "Banff"];

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
            
            
      
        } else {
       //     controller.signOut();
           // $('.user').replaceWith(x);
            alert("No active user");
           
        }
    
      })
      
})
// export async function initialActivities() {
//     $('#activity1').empty();
//     $('#activity2').empty();
//     $('#activity3').empty();
//     $('#activitiesTitle').empty();
//     auth.onAuthStateChanged(function(user) {
//         if (user) {
//        //     controller.signIn(user);
//       //     $(".formContainer").replaceWith(x);
//       //      $(".signOut").click(signOut);
            
//             const curr = auth.currentUser;
//             console.log(curr.email);
//           //location = db.collection("users").doc(curr.email).data.location;
//           let docRef = db.collection("users").doc(curr.email);
//             docRef.get().then(function(doc) {
            
//                 if (doc.exists) {
//                  console.log("Document data:", doc.data());
                    
//                     location = doc.data().location;
//                     let split = location.split("/");
//                     initialCity = split[0];
                    
//                 } else {
//                     // doc.data() will be undefined in this case
//                     console.log("No such document!");
//                 }
                
//             }).then(async function() { 
//                 console.log(initialCity);
//                 var city = [];
//                 var activity = [];
//                 var actdesc = [];
                
//                 for (let i = 0; i < data.length; i++) {
//                     city.push(data[i].location);
//                     activity.push(data[i].activity[i]);
//                     actdesc.push(data[i].actdesc[i]);
//                 }
//                 for (var i = 0; i < data.length; i++) {
//                     $('#activitiesTitle').append(`<h1 class="title is-2"><center>Top 3 Activities - ${city[i]}</center></h1><br>`);
//                     let activity = activity[i];
//                     let actdesc = actdesc[i];
//                     $('#activity1').append(`<div class="column"><center>
//                     <h1 class="title is-3">Activity ${i+1}</h1><br>
//                     <div class="is-size-5">
//                     ${activity}<br>
//                     ${actdesc}
//                     </div>
//                     </center></div>`);
//                 }
//             });
            
      
//         } else {
//        //     controller.signOut();
//            // $('.user').replaceWith(x);
//             alert("No active user");
           
//         }
    
//       })
    
// }

export async function getActivities(data) {
   // console.log("hey");
    event.preventDefault();
    $('#activity1').empty();
    $('#activity2').empty();
    $('#activity3').empty();
    $('#activitiesTitle').empty();
    var city = $("#cityName").val();
    console.log(city);
    var places = [];
    var activities = [];
    var actdescriptions = [];
    for (let i=0; i<data.length; i++) {
        console.log("hi");
        places.push(data[i].location);
        var oneactivity = [];
        var onedescription = [];
        var obj = data[i].activity;
        for (const letter in obj) {
            oneactivity.push(obj[letter]);
            // oneactivity.push(data[i].activity[j]);
            // onedescription.push(data[i].actdesc[j]);
        }
        console.log(oneactivity[0]);
        activities.push(oneactivity);
        // actdescriptions.push(onedescription);
    }
    console.log(activities[0]);
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
    
    $(document).on("click", ".searchCity", getActivities);

    // $('#cityName').autocomplete({

    //     source: querySourceData,

    // });
    
    // debouncing 
    // let array = [];
    // $('#cityName').keypress(async function() {
    //     let value = $('#cityName').val();
    //     const result = await axios({
    //         method: 'GET',
    //         url: 'https://andruxnet-world-cities-v1.p.rapidapi.com/',
    //         params: {query: value, searchby: 'city'},
    //         headers: {
    //             'x-rapidapi-key': '43400b8ec8mshb4369054fa959f0p158ac2jsn93dac0c502b3',
    //             'x-rapidapi-host': 'andruxnet-world-cities-v1.p.rapidapi.com'
    //         }
    //     });

    //     array = result.data;
               
    // });

    // console.log(array);
    $('#cityName').autocomplete({
        source: cities,
        delay: 200
    });


});