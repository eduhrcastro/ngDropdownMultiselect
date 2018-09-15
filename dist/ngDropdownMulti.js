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

var NgDropdownMulti = 'ngDropdownMulti';
var dropdownMulti = angular.module('ngDropdownMulti', []);

dropdownMulti.controller('DropdownMultiselectCtrl', function () {

  var vm = this;

  vm.title = 'Teste de UMD Directive';

  console.log('test');
});
'use strict';

var dropdownMulti = angular.module('ngDropdownMulti');

dropdownMulti.directive('dropdownMultiselect', function () {

  return {
    restrict: 'AE',
    controller: 'DropdownMultiselectCtrl as dropdownMultiselectCtrl',
    templateUrl: 'templates/dropdownMultiselect.html'
  };
});
'use strict';

angular.module('ngDropdownMulti').run(['$templateCache', function ($templateCache) {
  $templateCache.put('templates/dropdownMultiselect.html', '<h1>{{dropdownMultiselectCtrl.title}}</h1>\n' + '');
}]);

exports.ngDropdownMulti = NgDropdownMulti;
}));
