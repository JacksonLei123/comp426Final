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
     //   .then((e) => alert("Signed In as " + email.value))
        .then((e) => window.location.replace("user.html"))
        .catch(error => alert("Could not sign in"));
    
}

let signUp = function() {
    // testing
    let firstname = $(".firstNameBox").val();
    let lastname = $(".lastNameBox").val();
    let display = firstname + " " + lastname;
    let email = $(".emailBox").val();
    let password = $(".passwordBox").val();
    let search = firstname.toLowerCase() + "" + lastname.toLowerCase();
    let start = new Date(2020, 10, 24);
    let end = new Date (2020, 10, 25);
    
            // maybe fix this later this is a little faulty
        const promise = auth.createUserWithEmailAndPassword(email, password)
           // .then((e) => alert("Account Created"))
            .then((e) => renderLoginPage())
            .then((e) => {
                db.collection("users").doc(email).set({
                    first: firstname,
                    last: lastname,
                    displayName : display,
                    emailaddress: email,
                    searchname: search,
                    quizTaken: false,
                    location: "",
                    startDate: start,
                    endDate: end,
                    requests: [],
                    friends: []
                    })
            })
            .catch(error => alert("invalid email or password"));

            // promise.catch(e => alert("invalid email or password"));
            // console.log(promise);
            // alert("Account Created");
}

let renderSignUpForm = function() {
  
    let x = `<div class = "signUpForm">
    <div class="signUpBox">
    <h1 class="title is-1" style="font-family: 'Poppins', sans-serif">Sign Up</h1><br><br>
    <input class="firstNameBox" type = "firstname" placeholder = "First Name"/>
    <br>
    <input class="lastNameBox" type = "lastname" placeholder = "Last Name"/>
    <br>
    <input class="emailBox" type = "email" placeholder = "Email"/>
    <br>
    <input class="passwordBox" type = "password" placeholder = "Password"/>
    <br>
    <button class="button submitsignup"> Submit </button>
    <button class="button cancelsignup"> Cancel </button>
    </div>
    </div> 
    `
    $("#root").empty().append(x);
    
};

let renderLoginPage = function() {
      
    let x =  `<div class = "formContainer">
    <div class="login">
    <h1 class="title is-1" style="font-family: 'Poppins', sans-serif">heelscation</h1>
    <br>
    <img src="426 logo.png" style="height: 125px; padding-top: 10px; padding-bottom: 10px"/>
    <div id = "header" class="is-size-5">a dream vacation planner</div><br>
    <input class="emailBox" type = "email" placeholder = "Email" id = "email" />
    <br>
    <input class="passwordBox" type = "password" placeholder = "Password" id = "password"/>
    <br>
    <button class = "button signUp"> Sign Up</button>
    <button class = "button signIn"> Sign In</button>
    </div>
    </div>`
    $('#root').empty().append(x);
};


$(document).ready(() => {

    $('body').on('click', '.signIn', function() {

        signIn();

    })

    $('body').on('click', '.signUp', function() {

        renderSignUpForm();
    })

    $('body').on('click', '.submitsignup', function() {

        signUp();
    })

    $('body').on('click', '.cancelsignup', function() {

        renderLoginPage();
    })









});
