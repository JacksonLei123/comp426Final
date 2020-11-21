// MEOW
export default class AppView {

    constructor(model) {
        this.model = model;
    }
    
    // show user page
    renderUser() {
      $('#root').empty()
        let that = this;
        let user = this.model.auth.currentUser;
        console.log(user);
        let docRef = this.model.db.collection("users").doc(user.email);
        let name = "";
          docRef.get().then(function(doc) {
            
              if (doc.exists) {
                  console.log("Document data:", doc.data());
                  
                  name = doc.data().displayName;
                  
              } else {
                  // doc.data() will be undefined in this case
                  console.log("No such document!");
              }
              
          }).then(async function() {
            // original user div
            
            let there = that;
            let x = `<div>
            <nav>
              <ul>
                <li><a href="index.html">HOME</a></li>
                <li><a href="weather.html">WEATHER</a></li>
              </ul>
            </nav>
          </div>
            <div class = "user" style="padding: 1em"> 
            <div><h1 class="title is-2">${name}  <i class="fa fa-plane"></i> </h1><button class = "button signOut is-dark has-text-right"> Sign Out</button></div>
            <em>${user.email}</em>
            
            <input type = "search" placeholder = "searchusers" id = "searchusers"/> 
            <br>
            <br>
            <button class = "button notes is-dark"> Notes </button>
          
            <div class = "usersearch"> </div>

            <div class = "notescontainer">
              <div class = "notereference"> </div>
            </div>
            <br>

            <div>
              <label for="start">Start date:</label>
              <input type="date" id="start" name="trip-start"
                   value="2020-11-21"
                   min="2020-11-21" max="2021-11-21">
              <label for="start">End date:</label>
              <input type="date" id="start" name="trip-start"
                    value="2020-11-21"
                    min="2020-11-21" max="2021-11-21">  
                    <button type="button" class="saveDates button is-dark">
                    Save</button>     
            </div>

            <div class="quiz">
              <div>
                <button type="button" class="quizButton button is-dark">
                Take the quiz!</button>
              </div>
            </div>

            </div>
          `
        
        
            $("#root").empty().append(x);
            $(".notes").one("click", function() {
              there.renderNotes();
            });
            $("body").on("click", ".quizButton", function() {
              there.renderQuizForm(questions);
            });
            $("body").on("click", ".cancelQuiz", function() {
              there.cancelQuizForm();
            });
            $("body").on("click", ".submitQuiz", function() {
              there.compileResults(data);
            });

            let usernames = that.model.db.collection('users').doc('usernames');
            let userslist = await usernames.get();
            let list = [];
            if (!userslist) {
              console.log('No such document!');
            } else {
              list = userslist.data().names;
            }

            $('#searchusers').autocomplete({
              source: list,
              autoFocus: true
            })


   //         $(".signOut").click(signOut);
            $("#searchusers").on('keypress', function(e) {
              let those = there;
              if(e.which == 13) {
                let count = 0;
                let val = $("#searchusers").val();
                let lowercased = val.replace(/\s+/g, '').toLowerCase();

                those.model.db.collection("users").where("searchname", "==", lowercased)
                  .get()
                  .then(function(querySnapshot) {
            
                    querySnapshot.forEach(function(doc) {
        
                      // doc.data() is never undefined for query doc snapshots
                      console.log(doc.id, " => ", doc.data());
                      // add css to DOM to make look better
                      let x = `<div class = "searchresults"> ${doc.data().displayName} ${doc.data().emailaddress}`
                      $(".usersearch").append(x);
                      count++;
                    });
                })
                  .then(function() {
                    if (count == 0) {
                      alert("user not found");
                    }
                  })
                  .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });

                // add other filters (what if user only types in the first name or just the last name)
          
          
              }
          });
        
          }).catch(function(error) {
              console.log("Error getting document: ", error);
          });
         
    };

    // after signing out replaces DOM with the sign in page
    renderHomePage() {
      
        let x =  `<div class = "formContainer">
        <div class="login">
        <h1 class="title is-1">Site Name</h1>
        <br>
        <img src="426 logo.png" style="height: 125px; padding-top: 10px; padding-bottom: 10px">
        <div id = "header"></div>
        <label class="subtitle is-3 has-text-weight-semibold">Email</label>
        <br>
        <input class="emailBox" type = "email" placeholder = "email" id = "email" />
        <br>
        <label class="subtitle is-3 has-text-weight-semibold">Password</label>
        <br>
        <input class="passwordBox" type = "password" placeholder = "password" id = "password"/>
        <br>
        <button class = "button signUp"> Sign Up</button>
        <button class = "button signIn"> Sign In</button>
        </div>
        </div>`
        $('#root').empty().append(x);
    };

    // show all notes for the user
    renderNotes() {
      let user = this.model.auth.currentUser;
      let count = 0;
      let that = this;
      this.model.db.collection("users").doc(user.email).collection("notes")
        .get()
        .then(function(querySnapshot) {
          console.log(querySnapshot);
          querySnapshot.forEach(function(doc) {

            // notes div
            let x = `
              <div style = "opacity: 75%; width: 55%; padding: 1em" id = "note${doc.id}"> 
              <span>${doc.id}</span>
              <br>
              <button class = "editnotes" id = "editnotes${doc.id}">View</button> 
              <button class = "deletenotes" id = "deletenotes${doc.id}"> Delete </button>
              </div>`
              $('.notereference').append(x);
              $('#editnotes' + doc.id).one('click', function() {
                that.renderNoteView(doc.id);
                console.log(doc.id);
              })
              count++;
                    
          })

        })
        .then(function() {
          let x = `
            <div>
              <input class = "noteTitle" placeholder = "new note title"> </input>
              <button class = "addNotes"> add </button> 
            </div>
          `
          $('.notescontainer').append(x);
          $('.addNotes').on('click', function() {
            let title = $('.noteTitle').val()
            that.addNote(title);
          });

          if (count == 0) {
            alert("user has no notes");
          } else {
            $(".notes").one("click", function() {
              that.closeNotes('.notereference');
            });
          }
        })
        .catch(function(error) {
            console.log("Error getting document: ", error); 
        });
    
    };

    // delete a note for user
    deleteNote(docid) {
      $('#note' + docid).remove();
    }
    
    // add user note asynchrounously; if note title already exists, will not add
    async addNote(docid) {
      let that = this;
    
      console.log(docid);

      let mod = this.model.newNote(docid);

      setTimeout(function() {
        // make sure that note title does not already exist in the database 
        if (!that.model.alreadyexists) {

          let x = `
          <div style = "opacity: 75%; width: 55%; padding: 1em" id = "note${docid}"> 
          <span>${docid}</span>
          <br>
          <button class = "editnotes" id = "editnotes${docid}">View</button> 
          <button class = "deletenotes" id = "deletenotes${docid}"> Delete </button>
          </div>` 
  
          $('.notereference').append(x);
          $('#editnotes' + docid).on('click', function() {
          that.renderNoteView(docid);
          })
  
  
  
        }


      }, 200);

      // if (!mod) {


      //   let x = `
      //   <div style = "background-color:powderblue" id = "note${docid}"> 
      //   <span>${docid}</span>
      //   <br>
      //   <button class = "editnotes" id = "editnotes${docid}">View</button> 
      //   <button class = "deletenotes" id = "deletenotes${docid}"> Delete </button>
      //   </div>` 

      //   $('.notereference').append(x);
      //   $('#editnotes' + docid).on('click', function() {
      //   that.renderNoteView(docid);
      //   console.log(docid);
      //   })



      // }

    }

    // minimize notes
    closeNotes() {
      $('.notescontainer').empty();
      $('.notescontainer').append(`<div class = "notereference"> </div>`);
      let that = this;
      $('.notes').one('click', function() {
        that.renderNotes();
      })
      
    };

    // click on specific note to see what has been written
    async renderNoteView(e) {
      let that = this;
      let current = this.model.auth.currentUser;
      let notes = this.model.db.collection('users').doc(current.email).collection('notes').doc(e);
      let note = await notes.get();
      var n;
      if (!note.exists) {
        console.log('No such document!');
      } else {
        n = note.data().notes;
      }

      console.log(e);
        
      $('#note' + e).append(`<p id = "myTextArea${e}" >
      <textarea id = "writtennotes${e}"
              rows = "10"
              cols = "80"
              placeholder="Your text here"> ${n} 
      </textarea>
      <br>
      <button class = "submitnote" id = "submitnote${e}">Save</button>
  
      </p>`);

      $('#editnotes' + e).one("click", function() {
        $('#' + "myTextArea" + e).remove();

        $('#editnotes' + e).one('click', function() {
          that.renderNoteView(e);
        })
      })


    }
    saveDate() {
      
    }
    // show sign up form
    renderSignUpForm() {
  
        let x = `<div class = "signUpForm">
        <div class="signUpBox">
        <label class="subtitle is-3 has-text-weight-semibold">First Name</label>
        <br>
        <input class="firstNameBox" type = "firstname" placeholder = "firstname" class = "signUpinput1"/>
        <br>
        <label class="subtitle is-3 has-text-weight-semibold">Last Name</label>
        <br>
        <input class="lastNameBox" type = "lastname" placeholder = "lastname" class = "signUpinput2"/>
        <br>
        <label class="subtitle is-3 has-text-weight-semibold">Email</label>
        <br>
        <input class="emailBox" type = "email" placeholder = "email" class = "signUpinput3" />
        <br>
        <label class="subtitle is-3 has-text-weight-semibold">Password</label>
        <br>
        <input class="passwordBox" type = "password" placeholder = "password" class = "signUpinput4" />
        <br>
        <button class="button submitsignup"> Submit </button>
        <button class="button cancelsignup"> Cancel </button>
        </div>
        </div> 
        `
        $("#root").empty().append(x);
        
    };

  // show quiz form
    renderQuizForm(questions) {
      let x = `
      <br> 
      <div class="quizForm"> <h1 class="title is-3">welcome to da quiz</h1>
      <br> 
      <div class="box">`
  
      for (let i = 0; i < questions.length; i++) {
        let questionNumber = i + 1;

        x +='<div class="question">' + questionNumber + '. '+ questions[i].question + `<br>` + '</div>'
        x+= `<div class="answers">`
        var obj = questions[i].answers;
        let j = 0;
        for (const letter in obj) {
          j++;
          x+= 
          `<div class= choiceButtons> 
              <input type="radio" name="choice-${i}" id="${i}-${j}"> ${letter}. ${obj[letter]}
              <br>
          </div>`
        }
        x+=`</div> <br> `
      }
      x += `
      </div>
      <br> 
      <div>
        <button class="submitQuiz button is-dark">Submit</button>
        <button class="cancelQuiz button is-dark">Cancel</button>
      </div>

      </div>  
      `
    $('.quiz').replaceWith(x);
    
  }
    cancelQuizForm() {
      let x = 
              `<div class="quiz">
                <div>
                  <button type="button" class="quizButton button is-dark">Take the quiz!</button>
                </div>
              </div>`
      $('.quizForm').replaceWith(x);
    }
    compileResults() {
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
      for (let i = 0; i < data.length; i++) {
        places.push(data[i].location);
        descriptions.push(data[i].description);
      }

      let max = -1;
      let finalPlace = "";
      let finalDescription = "";
      for (let i =0; i < scores.length; i++) {
        if (scores[i] > max) {
          max = scores[i];
          finalPlace = places[i];
          finalDescription = descriptions[i];
        }
      }

      let x = 
      `<div class="resultsPage">
        <h1 class="title is-3">Here are your results!</h1>
        <h2>${finalPlace}</h2>
          <p class="subtitle is-5">${finalDescription}</p>
      </div>
      `

      $('.quizForm').replaceWith(x);
    }
   
}
