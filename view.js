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
            let x = `<div class = "user"> ${user.email} ${name}
            <button class = "signOut"> Sign Out</button>
            <input type = "search" placeholder = "searchusers" id = "searchusers"/>
            <button class = "notes"> Notes </button>

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
        <h1>Form</h1>
        <div id = "header"></div>
        <input type = "email" placeholder = "email" id = "email" />
        <input type = "password" placeholder = "password" id = "password"/>
          
        <button class = "signUp"> Sign Up</button>
        <button class = "signIn"> Sign In</button>
          
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
  
        let x = `<div id = "signUpForm">
        <input type = "firstname" placeholder = "firstname" class = "signUpinput1"/>
        <input type = "lastname" placeholder = "lastname" class = "signUpinput2"/>
        <input type = "email" placeholder = "email" class = "signUpinput3" />
        <input type = "password" placeholder = "password" class = "signUpinput4" />
        <button class = "submitsignup"> Submit </button>
        <button class = "cancelsignup"> Cancel </button>
        </div>
        `
        $("#root").empty().append(x);
            
    };

  





}