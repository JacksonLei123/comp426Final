// MEOW
export default class AppView {

    constructor(model) {
        this.model = model;
  
    }
    
    // show user page
    async renderUser() {
     // $('#root').empty();
        let that = this;
        let user = this.model.auth.currentUser;
        let docRef = this.model.db.collection("users").doc(user.email);
        let name = "";
        let tookQuiz;
        let location = ""; 
        let startDate;
        let endDate;
        docRef.get().then(function(doc) {
            
              if (doc.exists) {
                  console.log("Document data:", doc.data());
                  
                  name = doc.data().displayName;
                  tookQuiz = doc.data().quizTaken;
                  location = doc.data().location;
                  startDate = doc.data().startDate;
                  endDate = doc.data().endDate;
              } else {
                  // doc.data() will be undefined in this case
                  console.log("No such document!");
              }
              
          }).then(async function() {
            // original user div
            let startMonth = startDate.toDate().getMonth()+1;
            let startDay = startDate.toDate().getDate();
            let endMonth = endDate.toDate().getMonth()+1;
            let endDay = endDate.toDate().getDate();
            let there = that;
            if(startMonth<10) {
              startMonth = "0"+ startMonth;
            }     
            if (startDay < 10) {
              startDay = "0" + startDay;
            }
            if (endMonth < 10) {
              endMonth = "0" + endMonth;
            }
            if (endDay < 10) {
              endDay = "0" + endDay;
            }
            let userdiv = `<div>
          </div>
            <div class = "user" style="padding: 1em"> 
            <div><h1 class="title is-2" style="font-family: 'Poppins', sans-serif">${name} <i class="fa fa-plane"></i> </h1> </div>
            <em style="font-family: 'Poppins', sans-serif">${user.email}</em>
            <input type = "search" placeholder = "Search users" id = "searchusers" style="font-family: 'Poppins', sans-serif"/> 
            <br>
            <br>
            <button class = "button notes is-dark" style="font-family: 'Poppins', sans-serif"> Notes </button>
  

            <div class = "notescontainer" style="font-family: 'Poppins', sans-serif">
              <div class = "notereference"> </div>
            </div>
            <br>

            <div style="font-family: 'Poppins', sans-serif">
              <label for="start">Start date:</label>
              <input type="date" id="startDate" name="trip-start" placeholder="yyyy-MM-dd"
                   value="${startDate.toDate().getFullYear()}-${startMonth}-${startDay}"
                   min="2020-01-01" max="2021-11-21">
              <label for="start">End date:</label>
              <input type="date" id="endDate" name="trip-end"
                    value="${endDate.toDate().getFullYear()}-${endMonth}-${endDay}"
                    min="2020-01-01" max="2021-11-21">  
                    <button type="button" class="saveDates button is-dark">
                    Save</button>     
            </div>
            <div style="display: flex" style="font-family: 'Poppins', sans-serif">
            <div class="quiz" style="flex-grow:1"> </div>

            <div class = "usersearch box" style="opacity: 75%" style="font-family: 'Poppins', sans-serif">
            <h1 class="title is-3" style="font-family: 'Poppins', sans-serif"><u>Profiles</u></h1>
            </div>
          
            </div>`
            console.log(startDate);
            var quiz;
            if (tookQuiz) {
          
              console.log(location);
              let split = location.split("/");
              quiz = `<div class="resultsPage" style="font-family: 'Poppins', sans-serif">
              <h1 class="title is-3" style="font-family: 'Poppins', sans-serif">
              Your results: </h1>
              <h2 style="font-family: 'Poppins', sans-serif">${split[0]}</h2>
                <p class="subtitle is-5" >${split[1]}</p>
                <img src="${split[2]}" style="width: 800px; padding-bottom: 10px"/><br>
              <button class = "takeagain button is-dark">Take Again</button
              </div>`
              
            } else {

              quiz = `
              <div style="font-family: 'Poppins', sans-serif">
              <button type="button" class="quizButton button is-dark">
              Take the quiz!</button>
              </div>`
        
            }
            
            $("#root").empty().append(userdiv);
            $('.quiz').append(quiz);
            $('.takeagain').on('click', function() {
              there.renderQuizForm(questions);
          })

    //         let ja = that.model.db.collection('users').doc('briannali2018@gmail.com');
    // let y = await ja.get();

    // if (!y) {
    //     console.log("no such doc");
    // } else {

    //   console.log(y.data().startDate.toDate().getDate());
    // }




            $(".notes").one("click", function() {
              there.renderNotes();
            });
            $("body").on("click", ".quizButton", function() {
              there.renderQuizForm(questions);
            });
            $("body").on("click", ".cancelQuiz", function() {
              there.cancelQuizForm();
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
              source: list

           
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
                      let split = doc.data().location.split("/");

                      // three if statements: 1) if you have already requested to be friends, make the div element say "pending"
                      // if you are already friends, make the div element say "friend"
                      // else just make the button for add

                      let emailwithoutat = doc.data().emailaddress.replace('@', '');
                      var div = "";
                      if (doc.data().requests.includes(user.email)) {
                        div = `<div class = "pending" id = "pending${doc.data().emailaddress}"> pending </div>`;
                      } else if (doc.data().friends.includes(user.email)) {
                        div = `<div class = "friend" id = "friend${doc.data().emailaddress}"> friend </div>`;
                      } else {
                        console.log(doc.data().emailaddress);
                        div = `<button class = "addfriend" id = "addfriend${doc.data().emailaddress}"> Add </button>`;
                      }

                      let x = `<div class = "searchresults box"> 
                                <div class="oneSearch">
                                  <strong>${doc.data().displayName}</strong> <br><em>${doc.data().emailaddress}</em><br> Destination: ${split[0]}
                                  ${div}
                                </div>
                              </div>`
                      $(".usersearch").empty().append(x);
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
              <br><input class = "noteTitle" placeholder = "New note"> </input>
              <button class = "addNotes"> Add </button> 
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
          $('#editnotes' + docid).one('click', function() {
          that.renderNoteView(docid);
          })
  
  
  
        }


      }, 200);


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

  // show quiz form
    renderQuizForm(questions) {
      let x = `
      <br> 
      <div class="quizForm" style="opacity: 75%"><h1 class="title is-3" style="font-family: 'Poppins', sans-serif">Welcome to the Quiz</h1>
      <h4 style="font-family: 'Poppins', sans-serif"><em>Answer these questions to get your dream destination!</em></h4>
      <br> 
      <div class="box">`
  
      for (let i = 0; i < questions.length; i++) {
        let questionNumber = i + 1;

        x +=`<div class="question" style="font-family: 'Poppins', sans-serif">` + questionNumber + '. '+ questions[i].question + `<br>` + '</div>'
        x+= `<div class="answers" style="font-family: 'Poppins', sans-serif">`
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
    $('.quiz').empty().append(x);
    
  }
  cancelQuizForm() {
    let that = this;
    var quizTaken;
    let user = this.model.auth.currentUser;
    let location = "";
    let docRef = this.model.db.collection('users').doc(user.email);
    docRef.get().then(function(doc) {
      if (doc.exists) {
        quizTaken = doc.data().quizTaken;
        location = doc.data().location;
      } else {
          
        console.log("No such document!")
      }

    }).then(function() {

      console.log(quizTaken);
      if (quizTaken) {
        let split = location.split("/");

        that.tookQuiz(split[0], split[1], split[2]);
        
      } else {

        let x = `<div>
            <button type="button" class="quizButton button is-dark">Take the quiz!</button>
          </div>`
        $('.quizForm').replaceWith(x);
      
      }




      
    })
  

    }
  tookQuiz(finalPlace, finalDescription, finalImage) {
    
      let x = 
      `<div class="resultsPage" style="font-family: 'Poppins', sans-serif", sans-serif">
        <h1 class="title is-3" style="font-family: 'Poppins', sans-serif">Your results: </h1>
        <h2 style="font-family: 'Poppins', sans-serif">${finalPlace}</h2>
          <p class="subtitle is-5">${finalDescription}</p>
        <img src = "${finalImage}" style = "width: 800px;padding-bottom: 10px"/> 
        <br>
        <button class = "takeagain button is-dark">Take Again</button
      </div>
      `
      let that = this;
      $('.quizForm').replaceWith(x);
      $('.takeagain').on('click', function() {
        that.renderQuizForm(questions);
      })

    }


    addFriend(emailaddress) {

      // i need to access the backend to see how to reflect it in the view

      // this will be for if there is a button to click at all 

      // once I click the button, the div should either show "pending" or "friend"

      // so all I need to do is check whether or not the other person has requested

      let user = this.model.auth.currentUser;
      let emailwithoutat = emailaddress.replace('@', '');

      this.model.db.collection('users').doc(user.email)
        .get()
        .then((doc) => {
          if (doc.data().requests.includes(emailaddress)) { 
            
            $(".addfriend").replaceWith(`<div class = "friend" id = "friend${doc.data().emailaddress}"> friend </div>`);

          } else {
        
            $(".addfriend").replaceWith(`<div class = "pending" id = "pending${doc.data().emailaddress}"> pending </div>`);
          }
        })

      
    }

    
  

   
}
