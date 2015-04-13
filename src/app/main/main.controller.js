'use strict';

angular.module('tiyattendance')
  .factory('Auth', function(Fire, $firebaseObject, $state){
    var auth = new Firebase(Fire.Base.Url);

  return {
    /**
    * Wrapper for `$firebaseAuth.$onAuth()` that filters the `auth` object
    * through the `updateUser()` function
    */
    onAuth: function(creds){
      auth.onAuth(function(data){
        creds(updateUser(data));
      });
    },
    /**
    * Wrapper for `$firebaseAuth.$authWithOAuthPopup()` that invokes the
    * correct provider code.
    */
    login: function(){
       return auth.authWithOAuthPopup("github", function(error, authData) {
        if (error) {
            console.log("Login Failed!", error);
        } else {
            console.log("Logged in as:", authData);
            return $state.go('instructor', { instructor_id: authData.github.id } );
        }
      })
    },

    loggedIn: function(){
      if(auth.getAuth()){
            $state.go('instructor', { instructor_id: authData.github.id } );
            return true;
      }
    },
    /**
    * Wrapper for `$firebaseAuth.$unauth()`
    */
    logout: function(){
      auth.unauth();
    },
  }; // END service

  /**
  * Tranform the `authdUser` object from `$firebaseAuth` into a full User
  * record in the `/users` collection.
  *
  * @param {Object} authdUser from $firebaseAuth.getAuth()
  * @return {Object} from $firebase.$asObject()
  */
  function updateUser(authdUser){
    if ( authdUser === null ){
      return null;
    }

    /**
    * Create a reference to the users collection within Firebase
    * Then create a child of the users collection named after the
    * authdUser's Facebook ID
    */
    var user = auth.child('Instructors').child(authdUser.github.id);

    // Update the authdUser's information in Firebase
    user.update({
      uid: authdUser.github.id,
      github: authdUser.github,
      fullName: authdUser.github.displayName,
      avatarUrl: authdUser.github.cachedUserProfile.avatar_url,
      location: authdUser.github.cachedUserProfile.location
    });

    // Set user to the object reference of authdUser
    user = $firebaseObject(auth.child('Instructors').child(authdUser.github.id));

    return user;
   }
  }) // END Auth Factory

  .controller('MainCtrl', function (Firebase, $firebaseArray, Auth, $state) {
    var self = this;
        
    this.login = Auth.login;
    this.logout = Auth.logout;
    
     /* Allows controller to check
      * if a user is logged in and
      * use their info on the page
      */
    Auth.onAuth(function(user){
        self.user = user;
        if (self.user === null ){
          console.log('No Current User')
          return $state.go('login');
        }
        else {
          console.log(user)
        }
    });
    
//    var instructorClasses = new Firebase('https://tiyattendance.firebaseio.com/' + this.user.uid + '/classes');
//    
//    //Begin student list for adding new classes
//    var studentList = new Firebase('https://tiyattendance.firebaseio.com/' + this.user.uid + '/classes/' + this.cohort);
//        
//    this.students = $firebaseArray(studentList);
//    
//    this.student = {
//        name: '',
//        github: '',
//        present: 0,
//        tardy: 0,
//        absent: 0
//    };
//    
//    this.addStudent = function(user){
//        self.feeList.$add({
//            name: user.name,
//            github: user.github,
//            present: user.present,
//            tardy: user.tardy,
//            absent: user.absent
//        });
//        
//        return self.student = {
//                    name: '',
//                    github: '',
//                    present: 0,
//                    tardy: 0,
//                    absent: 0
//                };
//    };
//    
//    this.nameEdit = false;
//    this.githubEdit = false;
//    
//    this.editName = function(){
//      if(self.nameEdit == false){
//          return self.nameEdit = true;
//      }
//      else {
//          return self.nameEdit = false;
//      }
//    };
//    
//    this.editGithub = function(){
//       if(self.githubEdit == false){
//          return self.githubEdit = true;
//      }
//      else {
//          return self.githubEdit = false;
//      };
//    };
//    
//    this.presentPlus = function(student){
//        return student.present++;
//    };
//    this.presentMinus = function(student){
//        return student.present--;
//    };
//    
//    this.tardyPlus = function(student){
//        return student.tardy++;
//    };
//    this.tardyMinus = function(student){
//        return student.tardy--;
//    };
//    
//    this.absentPlus = function(student){
//        return student.absent++;
//    };
//    this.absentMinus = function(student){
//        return student.absent--;
//    };
    
  });
