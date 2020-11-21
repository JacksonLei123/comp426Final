export default class User {

    constructor(db, auth) {

        this.db = db;
        this.auth = auth;
        this.alreadyexists = false;
        
    }
    signUp() {
// testing
        let firstname = $(".signUpinput1").val();
        let lastname = $(".signUpinput2").val();
        let display = firstname + " " + lastname;
        let email = $(".signUpinput3").val();
        let password = $(".signUpinput4").val();
        let search = firstname.toLowerCase() + "" + lastname.toLowerCase();
    
     //   console.log(db.collection("cities").doc("pnandmAJRjI41BTviGZh").get());
     //   alert("hi");
        // maybe fix this later this is a little faulty
        const promise = this.auth.createUserWithEmailAndPassword(email, password)
            .then((e) => alert("Account Created"))
            .catch(error => alert("invalid email or password"));
    
        this.db.collection("users").doc(email).set({
              first: firstname,
              last: lastname,
              displayName : display,
              emailaddress: email,
              searchname: search,
              quizTaken: false,
              location: ""
              
        })
        // promise.catch(e => alert("invalid email or password"));
        // console.log(promise);
        // alert("Account Created");

    
      }


    signIn() {
        let email = document.getElementById("email");
        let password = document.getElementById("password");
    
        const promise = this.auth.signInWithEmailAndPassword(email.value, password.value)
            .then((e) => alert("Signed In as " + email.value))
      //      .then((e) => window.location.replace("user.html"))
            .catch(error => alert("Could not sign in"));
        
      }

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























}