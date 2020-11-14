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
            let x = `<div class = "user" style="padding: 1em"> 
            <div><h1 class="title is-2">${name} </h1><button class = "button signOut is-dark has-text-right"> Sign Out</button></div>
            <em>${user.email}</em>
            <input type = "search" placeholder = "searchusers" id = "searchusers"/>
            <button class = "button notes is-dark"> Notes </button>

            <div class = "usersearch"> </div>

            <div style = "background-color:black" class = "notescontainer">
              <div class = "notereference"> </div>
            </div>

            </div>`
        
        
            $("#root").empty().append(x);
            $("body").one("click", ".notes", function() {
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
              <div style = "background-color:blue" id = ${doc.id}> 
              <span>${doc.id}</span>
              <button id = "editnotes${doc.id}">View</button> 
              </div>`
              $('.notereference').append(x);
              $('body').on('click', '#editnotes' + doc.id +'', function() {
                that.renderNoteView(doc.id);
                console.log(doc.id);
              })
              count++;
                    
          })

        })
        .then(function() {
          let x = `<div> <button class = "addNotes"> add </button> 
          <input class = "noteTitle" placeholder = "new note title"> </input>
          </div>`
          $('.notescontainer').append(x);
          if (count == 0) {
            alert("user has no notes");
          } else {
            $("body").one("click", ".notes", function() {
              that.closeNotes('.notereference');
            });
          }
        })
        .catch(function(error) {
            console.log("Error getting document: ", error); 
        });
    
    };

    addNote(docid) {
      let that = this;
      let x = `
      <div style = "background-color:blue" id = ${docid}> 
      <span>${docid}</span>
      <button id = "editnotes${docid}">View</button> 
      </div>`

      $('.notereference').append(x);
      $('body').on('click', '#editnotes' + docid +'', function() {
        that.renderNoteView(docid);
        console.log(docid);
      })
    }

    closeNotes() {
      $('.notescontainer').empty();
      $('.notescontainer').append(`<div class = "notereference"> </div>`);
      let that = this;
      $('body').one('click', '.notes', function() {
        that.renderNotes();
      })
      
    };

    renderNoteView(e) {
    //  this.model.db
      $('#' + e).replaceWith(`<p>
      <label>Text Area</label>
      <textarea id = "myTextArea"
              rows = "10"
              cols = "80">Your text here</textarea>
    </p>`);


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
        <button class = "button submitsignup"> Submit </button>
        <button class = "button cancelsignup"> Cancel </button>
        </div>
        </div>
        `
        $("#root").empty().append(x);
            
    };

  





}