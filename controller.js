/*meowmeow*/
export default class AppController {

    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    signUp() {
        this.view.renderSignUpForm();
    }
    submitSignUp() {
        this.model.signUp();
        this.view.renderHomePage();
    }
    cancelSignUp() {
        this.view.rend
        erHomePage();
    }

    signIn() {
        this.model.signIn();
    }

    signOut() {
        $(".notes").off("click");
        $(".editnotes").off("click");
        this.view.renderHomePage();
        this.model.signOut();
    }

    deleteNote(id) {
        this.model.deleteNote(id);
        this.view.deleteNote(id);
    }

    async addNote(title) {
        let that = this;
        // this.model.newNote(title)
        //     .then(function() {
        //         if (!that.model.alreadyexists) {
        //             that.view.addNote(title);
        //         }
        //     })
        //     .then(function() {
        //         that.model.alreadyexists = false;
        //     });
    
    
      
      
        // let bool = false;
    
        // var do_thing;
        // var y = function () { 
            
        //     if (!bool) {
        //         do_thing = that.view.addNote(title);
        //     } else {
        // }
        
        // }

        // that.model.newNote(title);
        // bool = that.model.alreadyexists;
        
        
        // y.then(do_thing);





        let v = function() {
            if (!that.model.alreadyexists) {
                that.view.addNote(title);
            }
            that.model.alreadyexists = false;
        }

        let r = function() {
            that.model.newNote(title);
        }

        await r();
        v();
        
        
        
    }

    







}