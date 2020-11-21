var firebaseConfig = {
    apiKey: "AIzaSyAhcDRlR3RBFEMtRjanuuDMDKqFHqjzJuU",
    authDomain: "comp426-19a60.firebaseapp.com",
    databaseURL: "https://comp426-19a60.firebaseio.com",
    projectId: "comp426-19a60",
    storageBucket: "comp426-19a60.appspot.com",
    messagingSenderId: "311446455287",
    appId: "1:311446455287:web:82692dda4340b7ae6f24f2"
  };

// Initialize firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

let signIn = function() {
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    const promise = auth.signInWithEmailAndPassword(email.value, password.value)
        .then((e) => alert("Signed In as " + email.value))
        .then((e) => window.location.replace("user.html"))
        .catch(error => alert("Could not sign in"));
    
  }


$(document).ready(() => {

    $('body').on('click', '.signIn', function() {

        signIn();

    })









});
