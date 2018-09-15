'use strict';

/* Controllers */
var sampleAppControllers = angular.module('sampleAppControllers', []);

sampleAppControllers.controller('DropdownMultiCtrl', ['$scope',
  function($scope) {

    var vm = this

    vm.title = "Sample Test"

    console.log('teste')

  }]);
