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
            
            
      
        } else {
       //     controller.signOut();
           // $('.user').replaceWith(x);
            alert("No active user");
           
        }
    
      })
      
})
