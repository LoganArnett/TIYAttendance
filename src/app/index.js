'use strict';

angular.module('tiyattendance', ['ngAnimate', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router', 'ui.bootstrap', 'firebase'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl as app'
      });

    $urlRouterProvider.otherwise('/');
  })
;
