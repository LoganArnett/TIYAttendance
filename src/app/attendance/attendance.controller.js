'use strict';

angular.module('tiyattendance')

.controller('AttendCtrl', function (Firebase, $firebaseArray, $firebaseObject, Auth, $state, $stateParams) {
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
    
    //Begin attendance and student list for actually taking attendance
    var attendList = new Firebase('https://tiyattendance.firebaseio.com/Cohorts/' + $stateParams.instructor_id + '/' + $stateParams.cohort + '/attendance');
    var studentList = new Firebase('https://tiyattendance.firebaseio.com/Cohorts/' + $stateParams.instructor_id + '/' + $stateParams.cohort + '/students');
        
    this.attendance = $firebaseArray(attendList);
    this.students = $firebaseArray(studentList)

    
    this.present = function(student){
        
         var info = new Firebase('https://tiyattendance.firebaseio.com/Cohorts/' + $stateParams.instructor_id + '/' + $stateParams.cohort + '/students/' + student.$id)
         
        this.studentPresent = student.present + 1;
        
        return info.update({
            present: this.studentPresent
        });
    };
    
    this.tardy = function(student){
        
         var info = new Firebase('https://tiyattendance.firebaseio.com/Cohorts/' + $stateParams.instructor_id + '/' + $stateParams.cohort + '/students/' + student.$id)
        
        this.studentTardy = student.tardy++
        
        return info.update({
            tardy: this.studentTardy
        });
    };
    
    this.absent = function(student){
        
         var info = new Firebase('https://tiyattendance.firebaseio.com/Cohorts/' + $stateParams.instructor_id + '/' + $stateParams.cohort + '/students/' + student.$id)
         
         this.studentAbsent = student.absent++;
        
        return info.update({
            absent: this.studentAbsent
        });
    };
    
  });