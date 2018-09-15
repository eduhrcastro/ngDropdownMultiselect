let dropdownMulti = angular.module('ngDropdownMultiselect', [])

dropdownMulti.directive('dropdownMultiselect', () => {

  	return {
  		restrict: 'AE',
  		controller: 'DropdownMultiselectCtrl as dropdownMultiselectCtrl',
  		templateUrl: 'src/dropdownMultiselect.html',
  	}

})
