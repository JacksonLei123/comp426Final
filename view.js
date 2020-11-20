// MEOW
export default class AppView {

    constructor(model) {
        this.model = model;
    }

    renderUser() {
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
              
          }).then(function() {
            // add css to DOM to make it look better
            let there = that;
            let x = `<div>
            <nav>
              <ul>
                <li><a href="index.html">HOME</a></li>
                <li><a href="portfolio.html">WEATHER</a></li>
                <li><a href="blog.html">BLOG</a></li>
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
                   value="2020-10-22"
                   min="2020-10-22" max="2021-10-22">
              <label for="start">End date:</label>
              <input type="date" id="start" name="trip-start"
                    value="2020-10-22"
                    min="2020-10-22" max="2021-10-22">       
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


   //         $(".signOut").click(signOut);
            $("#searchusers").on('keypress', function(e) {
              let those = there;
              if(e.which == 13) {
                let count = 0;
                let val = $("#searchusers").val();
                
                those.model.db.collection("users").where("displayName", "==", val)
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

    renderHomePage() {

        let x =  `<div class = "formContainer">
        <div class="login">
        <h1 class="title">Site Name</h1>
        <br>
        <img /> Insert logo here?
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

    renderNotes() {
      let user = this.model.auth.currentUser;
      let count = 0;
      let that = this;
      this.model.db.collection("users").doc(user.email).collection("notes")
        .get()
        .then(function(querySnapshot) {
          console.log(querySnapshot);
          querySnapshot.forEach(function(doc) {
            let x = `
              <div style = "background-color:powderblue" id = "note${doc.id}"> 
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

    deleteNote(docid) {
      $('#note' + docid).remove();
    }
    //asdkfjhas;dfh
    addNote(docid) {
      let that = this;
      let x = `
      <div style = "background-color:powderblue" id = "note${docid}"> 
      <span>${docid}</span>
      <br>
      <button class = "editnotes" id = "editnotes${docid}">View</button> 
      <button class = "deletenotes" id = "deletenotes${docid}"> Delete </button>
      </div>` 

      $('.notereference').append(x);
      $('#editnotes').on('click', function() {
        that.renderNoteView(docid);
        console.log(docid);
      })
    }

    closeNotes() {
      $('.notescontainer').empty();
      $('.notescontainer').append(`<div class = "notereference"> </div>`);
      let that = this;
      $('.notes').one('click', function() {
        that.renderNotes();
      })
      
    };

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
      <label>Text Area</label>
      <textarea
              rows = "10"
              cols = "80"
              placeholder="Your text here"> ${n} </textarea>
      </p>`);

      $('#note' + e).one("click", function() {
        $('#' + "myTextArea" + e).remove();

        $('#note' + e).one('click', function() {
          that.renderNoteView(e);
        })
      })


    }

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

  
    renderQuizForm(questions) {
      let x = `
      <br> 
      <div class="quizForm"> <h1 class="title is-3">welcome to da quiz</h1> </div>  
      <br> 
      `
      for (let i = 0; i < questions.length; i++) {
        let questionNumber = i + 1;
        x +='<div class="question">' + questionNumber + '. '+ questions[i].question + `<br>` + '</div>'
          /* add the answers here */
        x+= `<div class="answers">`
        var obj = questions[i].answers;
        for (const letter in obj) {
          x+= `${letter}. ${obj[letter]} <br>`
        }
        x+=`</div> <br> `
      }
      x += `<br> 
      <div>
        <button class="submitQuiz button is-dark">Submit</button> 
        <button class="cancelQuiz button is-dark">Cancel</button>
      </div>
      `
    $('.quiz').replaceWith(x);
    }
//sadfasdfasdf
  }
