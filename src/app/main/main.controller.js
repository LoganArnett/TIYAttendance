'use strict';

angular.module('tiyattendance')
  .controller('MainCtrl', function (Firebase, $firebaseArray) {
    var feeStudentList = new Firebase('https://tiyattendance.firebaseio.com/FEE--Spring--2015'),
        self = this;
    this.feeList = $firebaseArray(feeStudentList);
    
    this.student = {
        name: '',
        github: '',
        present: 0,
        tardy: 0,
        absent: 0
    };
    
    this.addStudent = function(user){
        self.feeList.$add({
            name: user.name,
            github: user.github,
            present: user.present,
            tardy: user.tardy,
            absent: user.absent
        });
        
        return self.student = {
                    name: '',
                    github: '',
                    present: 0,
                    tardy: 0,
                    absent: 0
                };
    };
    
    this.nameEdit = false;
    this.githubEdit = false;
    
    this.editName = function(){
      if(self.nameEdit == false){
          return self.nameEdit = true;
      }
      else {
          return self.nameEdit = false;
      }
    };
    
    this.editGithub = function(){
       if(self.githubEdit == false){
          return self.githubEdit = true;
      }
      else {
          return self.githubEdit = false;
      };
    };
    
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
