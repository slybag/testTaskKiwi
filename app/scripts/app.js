'use strict';

/**
 * @ngdoc overview
 * @name testTaskApp
 * @description
 * # testTaskApp
 *
 * Main module of the application.
 */
var app = angular
  .module('testTaskApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'autocomplete'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

app.run(function ($rootScope) {
  $rootScope.apiBaseUrl = 'https://api.skypicker.com';
});
