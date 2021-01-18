//import {model} from "./app.js";

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

let signOut = function() {
    auth.signOut();
    window.location.replace("index.html");
}

let sendMessage = function(message, receiveremail) {

    let current = auth.currentUser;

    db.collection('users').doc(receiveremail).collection('friends').doc(current.email)
        .get()
        .then((docSnapshot) => {

            let messagesarray = docSnapshot.data().messages;

            messagesarray.push(message + "RE");

            db.collection('users').doc(receiveremail).collection('friends').doc(current.email).update({
                messages: messagesarray
            })


        })

    
    db.collection('users').doc(current.email).collection('friends').doc(receiveremail)
        .get()
        .then((docSnapshot) => {
            
            let messagesarray = docSnapshot.data().messages;

            messagesarray.push(message + "DE");

            db.collection('users').doc(current.email).collection('friends').doc(receiveremail).update({
                messages: messagesarray
            })



        })

}




$(document).ready(() => {

    $("body").on("click", ".signOut", signOut);

    auth.onAuthStateChanged(function(user) {

        if (user) {

            db.collection('users').doc(user.email).collection('friends')
                .get()
                .then(function(querySnapshot) {

                    querySnapshot.forEach(function(doc) {

                        let location = doc.data().location;
                        let split = location.split("/");
                        let friendCard = `<div class="friendCard column">
                        <h1 class="title is-4" style="font-family: 'Poppins', sans-serif">${doc.data().first} ${doc.data().last}</h1><br>
                        <p class="is-size-6">
                        Destination: ${split[0]}</p> 
                        </div><br>`

                        let messages = `<div class = "messagebox box" id = "${doc.data().first + doc.data().last}">
                        </div>`

                        let text = `<textarea class = "text" id = "${doc.data().first}"
                        rows = "5"
                        cols = "30"
                        placeholder="Your text here"></textarea>`

                        $('#root').append(

                            friendCard
                        )
                        $('#root').append(messages);
                        $('#root').append(text);

                        db.collection('users').doc(user.email).collection('friends').doc(doc.data().email)
                            .get()
                            .then((docSnapshot) => {

                                for (let i = 0; i < docSnapshot.data().messages.length; i++) {

                                    let x = `<div class = "message box"> 
                                    <div class="oneSearch">
                                      ${docSnapshot.data().messages[i]}
                                    </div>
                                    </div>`

                                    $('#' + doc.data().first + doc.data().last).append(x);
                            
                                }
                                   
                            })

                        $('#' + doc.data().first).on('keypress', function(e) {

                            if (e.which == 13) {
                               let text = $('#' + doc.data().first).val();
                               let email = doc.data().email;
                               sendMessage(text, email);
                               $('#' + doc.data().first).val("");
                            }
                        })

                        var length;

                        db.collection('users').doc(user.email).collection('friends').doc(doc.data().email)
                            .get()
                            .then((docSnapshot) => {

                                length = docSnapshot.data().messages.length;

                                db.collection('users').doc(user.email).collection('friends').doc(doc.data().email)
                                .onSnapshot(function(doc) {
    
                                    if (doc.data().messages.length != 0 && doc.data().messages.length > length) {
                                        let x = `<div class = "message box"> 
                                        <div class="oneSearch">
                                          ${doc.data().messages[doc.data().messages.length - 1]}
                                        </div>
                                        </div>`
    
                                        $('#' + doc.data().first + doc.data().last).append(x);
    
                                    }
    
                                    
                                })
                            })

                        // db.collection('users').doc(user.email).collection('friends').doc(doc.data().email)
                        //     .onSnapshot(function(doc) {

                                

                        //         if (doc.data().messages.length != 0) {
                        //             let x = `<div class = "message box"> 
                        //             <div class="oneSearch">
                        //               ${doc.data().messages[doc.data().messages.length - 1]} dfs
                        //             </div>
                        //             </div>`

                        //             $('#' + doc.data().first + doc.data().last).append(x);

                        //         }

                                
                        //     })
                            


                    })
                })



            

            
        }



    });


   








});


