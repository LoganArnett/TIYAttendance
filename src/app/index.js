'use strict';

angular.module('tiyattendance', ['ngAnimate', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router', 'ui.bootstrap', 'firebase'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/',
        templateUrl: 'app/login/login.html',
      })
      .state('instructor', {
        url: '/:instructor_id/cohorts',
        templateUrl: 'app/main/main.html',
        controller: 'CohortCtrl as cohort'
      })
      .state('students', {
        url: ':instructor_id/:cohort/students',
        templateUrl: 'app/students/students.html',
        controller: 'StudentsCtrl as stud'
      })
      .state('attendance', {
        url: ':instructor_id/:cohort/attendance',
        templateUrl: 'app/attendance/attendance.html',
        controller: 'AttendCtrl as attend'
      });

    $urlRouterProvider.otherwise('/');
  })

  .constant('Fire', {
    Base: {
        Url: 'https://TIYAttendance.firebaseio.com'
    }
})
;
