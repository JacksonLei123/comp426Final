import AppView from "./view.js";
import User from "./model.js";
import AppController from "./controller.js";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAhcDRlR3RBFEMtRjanuuDMDKqFHqjzJuU",
    authDomain: "comp426-19a60.firebaseapp.com",
    databaseURL: "https://comp426-19a60.firebaseio.com",
    projectId: "comp426-19a60",
    storageBucket: "comp426-19a60.appspot.com",
    messagingSenderId: "311446455287",
    appId: "1:311446455287:web:82692dda4340b7ae6f24f2"
  };

  let model = null;
  let controller = null;
  let view = null;

// Initialize firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();

$(document).ready(() => {
   
    model = new User(db, auth);
    view = new AppView(model);
    controller = new AppController(model, view);
    console.log(model);
    console.log(view);

    auth.onAuthStateChanged(function(user) {
        if (user) {
       //     controller.signIn(user);
      //     $(".formContainer").replaceWith(x);
      //      $(".signOut").click(signOut);
            view.renderUser();
         //   alert("Active user: " + user.email);
    
        } else {
       //     controller.signOut();
           // $('.user').replaceWith(x);
            alert("No active user");
           
        }
    
      })

    $('body').on('click', '.signUp', function() {

        controller.signUp();
    })

    $("body").on("click", ".submitsignup", function() {
        controller.submitSignUp();
      });
    $("body").on("click", ".cancelsignup", function() {
        controller.cancelSignUp();
    });

    $("body").on("click", ".signIn", function() {
        controller.signIn();
    });

    $("body").on("click", ".signOut", function() {
        controller.signOut();
    });

    // $("body").on('click', ".addNotes", function() {

    //     let title = $(".noteTitle").val();
    //     controller.addNote(title);
    //     console.log(title);
    // })

    $('body').on('click', '.deletenotes', function(e) {

        let id = e.target.id;
        let note = id.substring(11, id.length);
        console.log(note);

        controller.deleteNote(note);
        
    })

    $('body').on('click', '.submitnote', function(e) {

        let id = e.target.id;
        let note = id.substring(10, id.length);
       
        let val = $('#writtennotes' + note).val();
        console.log(val);
        controller.writeNote(note, val);

    });

    $("body").on("click", ".submitQuiz", function() {
        controller.tookQuiz();
      });

});
