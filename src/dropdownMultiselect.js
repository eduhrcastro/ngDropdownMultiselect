let dropdownMulti = angular.module('ngDropdownMulti')

dropdownMulti.directive('dropdownMultiselect', () => {

  	return {
  		restrict: 'AE',
  		controller: 'DropdownMultiselectCtrl as dropdownMultiselectCtrl',
  		templateUrl: 'templates/dropdownMultiselect.html',
  	}

})
