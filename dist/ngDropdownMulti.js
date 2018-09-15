(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports', 'angular'], factory);
    } else if (typeof exports === 'object') {
        factory(exports, require('angular'));
    } else {
        factory((root.ngDropdownMulti = {}), root.angular);
    }
}(this, function (exports, angular) {
'use strict';

var dropdownMulti = angular.module('ngDropdownMultiselect', []);

dropdownMulti.controller('DropdownMultiselectCtrl', function () {

  var vm = this;

  vm.title = 'Teste de UMD Directive';

  console.log('test');
});
'use strict';

var dropdownMulti = angular.module('ngDropdownMultiselect', []);

dropdownMulti.directive('dropdownMultiselect', function () {

  return {
    restrict: 'AE',
    controller: 'DropdownMultiselectCtrl as dropdownMultiselectCtrl',
    templateUrl: 'src/dropdownMultiselect.html'
  };
});

exports.ngDropdownMulti = NgDropdownMulti;
}));
