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

                        $('#root').append(

                            `<div>${doc.data().first} ${doc.data().last} ${split[0]} </div>`
                        )
                    })
                })



            

            
        }



    });


   








});


