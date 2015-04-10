'use strict';

angular.module('tiyattendance')

.controller('CohortCtrl', function (Firebase, $firebaseArray, $firebaseObject, Auth, $state, $stateParams) {
    var self = this;
    
     /* Allows controller to check
      * if a user is logged in and
      * use their info on the page
      */
    Auth.onAuth(function(user){
        self.user = user;
        if (user === null ){
          console.log('No Current User')
        }
        else {
          console.log(user)
        }
    });
    
    var instructorCohorts = new Firebase('https://tiyattendance.firebaseio.com/Cohorts/' + $stateParams.instructor_id);
    this.cohortArray = $firebaseArray(instructorCohorts);
    
    this.cohortInfo = {
        name: '',
        repo: '', 
        editName: false,
        editRepo: false
    };
    
    this.addCohort = function(info){
        self.cohortArray.$add(info);
        
        $state.go('students', { cohort: self.cohortInfo.name});
    };
    
    this.editName = function(info){
       info.editName = true;
    };
    
    this.cancelEditName = function(info){
        info.editName = false;
    }
    
    this.editRepo = function(info){
       info.editRepo = true;
    };
    
    this.cancelEditRepo = function(info){
        info.editRepo = false;
    }
    
    // Submitting edits
    this.editedName = function(edit){
        var nameEdits = new Firebase(instructorCohorts + '/' + edit.$id);

        return nameEdits.update({
            name: edit.name
        });
    };
    
    this.editedRepo = function(edit){
        var repoEdits = new Firebase(instructorCohorts + '/' + edit.$id);
        
        
        return repoEdits.update({
            repo: edit.repo
        });
    }
    
  });