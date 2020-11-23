// please oml

var cities = ["Paris", "New Zealand", "Maldives", "London", "Tokyo", "Phuket", "Banff"];

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
    $('body').on('click', ".signOut", signOut);
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
                    // $('#ifTaken').append(`<button class="button is-dark" id="ogActivities">View My Destination</button><br><br>`)
                    initialActivities(data);
                }
            });
            
            
          //location = db.collection("users").doc(curr.email).data.location;
            
            
      
        } else {
       //     controller.signOut();
           // $('.user').replaceWith(x);
         
           
        }
    
      })
      
})

export async function initialActivities(event) {
  $('#activity0').empty();
    $('#activity1').empty();
    $('#activity2').empty();
    $('#activitiesTitle').empty();
    auth.onAuthStateChanged(function(user) {
        if (user) {
       //     controller.signIn(user);
      //     $(".formContainer").replaceWith(x);
      //      $(".signOut").click(signOut);
            
            const curr = auth.currentUser;
            console.log(curr.email);

            let initialCity = "";
          //location = db.collection("users").doc(curr.email).data.location;
          let docRef = db.collection("users").doc(curr.email);
            docRef.get().then(function(doc) {
            
                if (doc.exists) {
                 console.log("Document data:", doc.data());
                    
                    location = doc.data().location;
                    let split = location.split("/");
                    initialCity = split[0];
                    // initialCity = doc.data().location;
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
                
            }).then(async function() { 
              // event.preventDefault();
              // let data = event.data;
              
              $('#activity0').empty();
              $('#activity1').empty();
              $('#activity2').empty();
              $('#activitiesTitle').empty();
              // var city = $("#cityName").val();
              console.log(initialCity);
              var places = []; 
          
              //logic for getting right activities
              for (let i=0; i<data.length; i++) {
                  if (data[i].location == initialCity) {
                  console.log("hi");
                  places.push(data[i].location);
                  var oneactivity = [];
                  var onedescription = [];
                  var obj = data[i].activity;
                  var obj2 = data[i].actdesc;
                  for (const letter in obj) {
                      oneactivity.push(obj[letter]);
          
                  }
                  for (const letter in obj2) {
                      onedescription.push(obj2[letter]);
                      
                  }
                  }
              }
              for (let i =0; i < 3; i++) {
                let x = `<div style="text-align: center; background-color: white; opacity: 75%;
                padding-top: 20px;
                padding-right: 30px;
                padding-left: 30px;
                margin: auto; width: 60%">
                <h1 class="title is-3 has-text-centered" style="font-family: 'Poppins', sans-serif">${oneactivity[i]}</h1></div>`;
                let y = `<div style="background-color: white; opacity: 75%; 
                padding-top: 10px;
                padding-right: 30px;
                padding-left: 30px;
                padding-bottom: 20px;
                margin: auto; width: 60%">
                <h1 class="title is-5" style="font-family: 'Poppins', sans-serif">${onedescription[i]}</h1></div>`;
               $('#activity' + i).append(x);
               $('#activity' + i).append(y);


             }
             $('#activitiesTitle').append(`<div class="column"><center>
             <h1 class="title is-2" style="font-family: 'Poppins', sans-serif">Top Attractions for: ${initialCity}</h1><br>`);
             $('#activity1').append(x);
          });
  
  } else {
    alert("No active user");
  }

  
  })
}

let signOut = function() {
  auth.signOut();
  window.location.replace('index.html');
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

// $(function() {
//     initialActivities();

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
    // $('#cityName').autocomplete({
    //     source: cities,
    //     delay: 200
    // });