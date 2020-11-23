export default class User {

    constructor(db, auth) {

        this.db = db;
        this.auth = auth;
        this.alreadyexists = false;
        
    }
//     signUp() {
// // testing
//         let firstname = $(".signUpinput1").val();
//         let lastname = $(".signUpinput2").val();
//         let display = firstname + " " + lastname;
//         let email = $(".signUpinput3").val();
//         let password = $(".signUpinput4").val();
//         let search = firstname.toLowerCase() + "" + lastname.toLowerCase();
    
//      //   console.log(db.collection("cities").doc("pnandmAJRjI41BTviGZh").get());
//      //   alert("hi");
//         // maybe fix this later this is a little faulty
//         const promise = this.auth.createUserWithEmailAndPassword(email, password)
//             .then((e) => alert("Account Created"))
//             .catch(error => alert("invalid email or password"));
    
//         this.db.collection("users").doc(email).set({
//               first: firstname,
//               last: lastname,
//               displayName : display,
//               emailaddress: email,
//               searchname: search,
//               quizTaken: false,
//               location: "",
//               startDate: {

//               },
//               endDate: {

//               }
//         })
//         // promise.catch(e => alert("invalid email or password"));
//         // console.log(promise);
//         // alert("Account Created");

    
//       }


    // signIn() {
    //     let email = document.getElementById("email");
    //     let password = document.getElementById("password");
    
    //     const promise = this.auth.signInWithEmailAndPassword(email.value, password.value)
    //         .then((e) => alert("Signed In as " + email.value))
    //   //      .then((e) => window.location.replace("user.html"))
    //         .catch(error => alert("Could not sign in"));
        
    //   }

    signOut() {
        this.auth.signOut();
   //     window.location = 'loginpage.html';
        alert("Signed Out");
    }

    newNote(notename) {
        this.alreadyexists = false;
        let that = this;
        let current = this.auth.currentUser;
        if (current) {
            this.db.collection('users').doc(current.email).collection('notes').doc(notename)
               .get()
               .then((docSnapshot) => {
                    console.log(docSnapshot.exists);
                    if (docSnapshot.exists) {
                        that.alreadyexists = true;
                        alert("Note title already exists"); 
                    } else {
                        that.db.collection("users").doc(current.email).collection("notes").doc(notename).set({
                            notes: ""
                        });
                    }
               })
               .catch((error) => {
                   console.log("Error getting documents: "+ error);
               })

        
        }   
    }
    saveDate() {

        let current = this.auth.currentUser;
        let x = $('#startDate').val();
        let y = $('#endDate').val();
        // yyyy-MM-dd
        let split1 = x.split("-");
        let split2 = y.split("-");

        let startDate = new Date(split1[0], split1[1]-1, split1[2]);
        let endDate = new Date(split2[0], split2[1]-1, split2[2]);

        this.db.collection("users").doc(current.email).update({
            startDate: startDate,
            endDate: endDate
        });
        // if(current) {
        //     this.db.collection('users').doc(current.email).update()
        //     .then((doc) => {
        //     if(doc.exists) {
        //         console.log(doc.data().startDate);
        //         startDate = doc.data().startDate;
        //     }
        //     })
        // }
        

    }
    async writeNote(notename, note) {
        let current = this.auth.currentUser;
        const notes = this.db.collection('users').doc(current.email).collection('notes').doc(notename);
        const write = await notes.set({
        notes: note
        }, { merge: true });

    }

    async deleteNote(notename) {
        let current = this.auth.currentUser;

        if (current) {

            const res = await this.db.collection('users').doc(current.email).collection('notes').doc(notename).delete();

        }
    }

    tookQuiz() {
        var questionNumber = 0;
        var ParisScore = 0; 
        var NZScore = 0;
        var BBScore = 0;
        var LondonScore = 0;
        var TokyoScore = 0;
        var PhuketScore = 0;
        var BanffScore = 0;
        let q1a1 = $('#0-1').prop('checked');
        let q1a2 = $('#0-2').prop('checked');
        let q1a3 = $('#0-3').prop('checked');
        let q1a4 = $('#0-4').prop('checked');
  
        console.log(q1a1);
        console.log(q1a2);
    
        let q2a1 = $('#1-1').prop('checked');
        let q2a2 = $('#1-2').prop('checked');
        let q2a3 = $('#1-3').prop('checked');
        let q2a4 = $('#1-4').prop('checked');
    
        let q3a1 = $('#2-1').prop('checked');
        let q3a2 = $('#2-1').prop('checked');
        let q3a3 = $('#2-3').prop('checked');
        let q3a4 = $('#2-4').prop('checked');
    
        let q4a1 = $('#3-1').prop('checked');
        let q4a2 = $('#3-2').prop('checked');
        let q4a3 = $('#3-3').prop('checked');
        let q4a4 = $('#3-4').prop('checked');
    
        let q5a1 = $('#4-1').prop('checked');
        let q5a2 = $('#4-2').prop('checked');
        let q5a3 = $('#4-3').prop('checked');
        let q5a4 = $('#4-4').prop('checked');
    
        let q6a1 = $('#5-1').prop('checked');
        let q6a2 = $('#5-2').prop('checked');
        let q6a3 = $('#5-3').prop('checked');
        let q6a4 = $('#5-4').prop('checked');
    
        // let q7a1 = $('#6-1').prop('checked');
        // let q7a2 = $('#6-2').prop('checked');
        // let q7a3 = $('#6-3').prop('checked');
        // let q7a4 = $('#6-4').prop('checked');
    
        if(q1a1) {
            questionNumber++;
            BBScore++;
            PhuketScore++;
        } else if(q1a2) {
            questionNumber++;
            TokyoScore++;
        } else if(q1a3) {
            questionNumber++;
            LondonScore++;
            BanffScore++;
        } else if(q1a4) {
            questionNumber++;
            ParisScore++;
            NZScore++;
        }
    
        if(q2a1) {
            questionNumber++;
            ParisScore++;
            LondonScore++;
            TokyoScore++;
        } else if (q2a2) {
            questionNumber++;
            BBScore++;
            PhuketScore++;
        } else if (q2a3) {
            questionNumber++;
            BanffScore++;
            NZScore++;
        } else if (q2a4) {
            questionNumber++;
            PhuketScore++;
        }
    
        if(q3a1) {
            questionNumber++;
            BanffScore++;
            NZScore++;
        } else if (q3a2) {
            questionNumber++;
            ParisScore++;
            TokyoScore++;
            BBScore++;
        } else if (q3a3) {
            questionNumber++;
            LondonScore++;
            BanffScore++;
            TokyoScore++;
            ParisScore++;
            NZScore++;
            PhuketScore++;
            BBScore++;
        } else if (q3a4) {
            questionNumber++;
            LondonScore++;
            BanffScore++;
            NZScore++;
        }
    
        if(q4a1) {
            questionNumber++;
            BBScore++;
            NZScore++;
            PhuketScore++;
            BanffScore++;
        } else if (q4a2) {
            questionNumber++;
            ParisScore++;
            LondonScore++;
            TokyoScore++;
        } else if (q4a3) {
            questionNumber++;
            ParisScore++;
            LondonScore++;
        } else if (q4a4) {
            questionNumber++;
            LondonScore++;
            TokyoScore++;
            NZScore++;
            ParisScore++;
        }
    
        if(q5a1) {
            questionNumber++;
            LondonScore++;
            ParisScore++;
            PhuketScore++;
            BBScore++;
        } else if (q5a2) {
            questionNumber++;
            TokyoScore++;
            ParisScore++;
            PhuketScore++;
            BBScore++;
            NZScore++;
        } else if (q5a3) {
            questionNumber++;
            BBScore++;
            NZScore++;
            PhuketScore++;
            BanffScore++;
        } else if (q5a4) {
            questionNumber++;
            ParisScore++;
            LondonScore++;
            TokyoScore++;
            BBScore++;
            PhuketScore++;
        }
    
        if(q6a1) {
            questionNumber++;
            ParisScore++;
            LondonScore++;
            TokyoScore++;
        } else if (q6a2) {
            questionNumber++;
            BanffScore++;
            BBScore++;
        } else if (q6a3) {
            questionNumber++;
            PhuketScore++;
            LondonScore++;
            NZScore++;
        } else if (q6a4) {
            questionNumber++;
            LondonScore++;
            TokyoScore++;
        }
    
        // if(q7a1) {
        //   questionNumber++;
    
        // } else if (q7a2) {
        //   questionNumber++;
    
        // } else if (q7a3) {
        //   questionNumber++;
            
        // } else if (q7a4) {
        //   questionNumber++;
            
        // }
        console.log(questionNumber);
        
        var scores = [ParisScore, NZScore, BBScore, LondonScore, TokyoScore, PhuketScore, BanffScore];
        let places = [];
        let descriptions = [];
        let images = [];
        for (let i = 0; i < data.length; i++) {
            places.push(data[i].location);
            descriptions.push(data[i].description);
            images.push(data[i].img);
        }

        let max = -1;
        let finalPlace = "";
        let finalDescription = "";
        let finalImage = "";
        for (let i =0; i < scores.length; i++) {
            if (scores[i] > max) {
            max = scores[i];
            finalPlace = places[i];
            finalDescription = descriptions[i];
            finalImage = images[i];
            }
        }
        let current = this.auth.currentUser;
        this.db.collection("users").doc(current.email).update({
            quizTaken: true,
            location: finalPlace + "/" + finalDescription + "/" + finalImage,
        });

        return finalPlace + "/" + finalDescription + "/" + finalImage;




    }

    addFriend(emailaddress) {

        let current = this.auth.currentUser;
        var potential;
        let that = this;

        var firstname;
        var lastname;
        var loc;

        if (current) {

            this.db.collection('users').doc(current.email)
                .get()
                .then((docSnapshot) => {
                    if (!docSnapshot.data().friends.includes(emailaddress)) {

                        console.log("two users preparing to friend");

                        this.db.collection('users').doc(current.email)
                        .get()
                        .then((docSnapshot) => {
                            let friendrequests = docSnapshot.data().requests;
                            let friendslist = docSnapshot.data().friends;
    
                            // if the person you are has already requested to be your friend
                            if (friendrequests.includes(emailaddress)) {
                                friendslist.push(emailaddress);
                                let removed = friendrequests.filter(function(value) {
                                    return value != emailaddress;
                                })
                                // remove the requests list and add to the friends list
                                that.db.collection('users').doc(current.email).update({
                                    requests: removed,
                                    friends: friendslist
                                })
                            // add current user to the friends list of the potential friend
                                that.db.collection('users').doc(emailaddress)
                                    .get()
                                    .then((docSnapshot) => {
                                        let friendslist2 = docSnapshot.data().friends;
                                        friendslist2.push(current.email);
                                        that.db.collection('users').doc(emailaddress).update({
                                            friends: friendslist2
                                        })
                                    })
                               
                                // add new friends in the friends doc for both users
                                that.db.collection('users').doc(emailaddress)
                                    .get()
                                    .then((docSnapshot) => {
                                        firstname = docSnapshot.data().first;
                                        lastname = docSnapshot.data().last;
                                        loc= docSnapshot.data().location;
                                        that.db.collection('users').doc(current.email).collection('friends').doc(emailaddress).set({
    
                                            first: firstname,
                                            last: lastname,
                                            location: loc
                                        })
                                        that.db.collection('users').doc(current.email)
                                            .get()
                                            .then((docSnapshot) => {
    
                                                that.db.collection('users').doc(emailaddress).collection('friends').doc(current.email).set({
                                                    first: docSnapshot.data().first,
                                                    last: docSnapshot.data().last,
                                                    location: docSnapshot.data().location
                                                })
                                            })
                                    
                                    })                        
                    // if the person you are requesting has NOT requested to be your friend
                            } else {
                                console.log("else");
                                this.db.collection('users').doc(emailaddress)
                                    .get()
                                    .then((docSnapshot) => {
                                        potential = docSnapshot.data().requests;
                                        
                                        if (!potential.includes(current.email)) {
                                            potential.push(current.email);
                                        }
    
                                        that.db.collection('users').doc(emailaddress).update({
    
                                            requests: potential
                                        })
                                    })
    
                                    .catch((error) => {
    
                                        console.log("Error getting documents: "+ error);
                                    })
    
    
    
                            }
                        })



                    }
                })

            
        }
    }























}