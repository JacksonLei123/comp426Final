/*meowwmeowmeow*/
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

        this.view.renderHomePage();
        this.model.signOut();
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
        await v();
        
        
        
    }

    







}