'use strict';

/* App Module */
var sampleApp = angular.module('sampleApp', [
  'ngRoute',
  'sampleAppControllers',
  'ngDropdownMulti'
]);

sampleApp.config(['$routeProvider','$locationProvider',
  function ($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('')
    $routeProvider.when('/', {
      templateUrl: 'partials/dropdownMulti.html',
      controller: 'DropdownMultiCtrl as dropdownMultiCtrl'
    }).otherwise({
      redirectTo: '/'
    });
  }
]);
