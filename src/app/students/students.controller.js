'use strict';

angular.module('tiyattendance')

.controller('StudentsCtrl', function (Firebase, $firebaseArray, Auth, $state, $stateParams) {
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
    
    //Begin student list for adding new classes
    var studentList = new Firebase('https://tiyattendance.firebaseio.com/Cohorts/' + $stateParams.instructor_id + '/' + $stateParams.cohort + '/students');
        
    this.students = $firebaseArray(studentList);
    
    this.student = {
        name: '',
        handle: '',
        avatar: '',
        present: 0,
        tardy: 0,
        absent: 0,
        editName: false,
        editHandle: false,
        editAvatar: false
    };
    
    this.addStudent = function(student){
        self.students.$add({
            name: student.name,
            handle: student.handle,
            avatar: student.avatar,
            present: student.present,
            tardy: student.tardy,
            absent: student.absent,
            editName: false,
            editHandle: false,
            editAvatar: false
        });
        
        return self.student = {
                    name: '',
                    handle: '',
                    avatar: '',
                    present: 0,
                    tardy: 0,
                    absent: 0,
                    editName: false,
                    editHandle: false,
                    editAvatar: false
                };
    };
    
    this.nameEdit = false;
    this.githubEdit = false;
    
    this.editName = function(info){
       info.editName = true;
    };
    
    this.cancelEditName = function(info){
        info.editName = false;
    };
    
    this.editHandle = function(info){
       info.editHandle = true;
    };
    
    this.cancelEditHandle = function(info){
        info.editHandle = false;
    }
    
    this.editAvatar = function(info){
       info.editAvatar = true;
    };
    
    this.cancelEditAvatar = function(info){
        info.editAvatar = false;
    }
    
   // Submitting edits
    this.editedName = function(edit){
        var nameEdits = new Firebase(studentList + '/' + edit.$id);

        return nameEdits.update({
            name: edit.name
        });
    };
    
    this.editedHandle = function(edit){
        var handleEdits = new Firebase(studentList + '/' + edit.$id);
        
        return handleEdits.update({
            handle: edit.handle
        });
    }
    
    this.editedAvatar = function(edit){
        var avatarEdits = new Firebase(studentList + '/' + edit.$id);
        
        return avatarEdits.update({
            avatar: edit.avatar
        });
    }
    
    this.presentPlus = function(student){
        return student.present++;
    };
    this.presentMinus = function(student){
        return student.present--;
    };
    
    this.tardyPlus = function(student){
        return student.tardy++;
    };
    this.tardyMinus = function(student){
        return student.tardy--;
    };
    
    this.absentPlus = function(student){
        return student.absent++;
    };
    this.absentMinus = function(student){
        return student.absent--;
    };
    
  });