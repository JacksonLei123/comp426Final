// MEOW
export default class AppView {

    constructor(model) {
        this.model = model;
    }

    // show user page
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
            // original user div
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


            </div>
          `
        
        
            $("#root").empty().append(x);
            $(".notes").one("click", function() {
              there.renderNotes();
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

    // after signing out replaces DOM with the sign in page

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
          <div style = "background-color:powderblue" id = "note${docid}"> 
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
      <button class = "submitnote" id = "submitnote${e}">Submit</button>
  
      </p>`);

      $('#editnotes' + e).one("click", function() {
        $('#' + "myTextArea" + e).remove();

        $('#editnotes' + e).one('click', function() {
          that.renderNoteView(e);
        })
      })


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

  
}