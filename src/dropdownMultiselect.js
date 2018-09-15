let dropdownMulti = angular.module('ngDropdownMulti')

dropdownMulti.directive('dropdownMultiselect', () => {

  	return {
      restrict: 'AE',
  		scope: {
  			selectedModel: '=',
  			options: '=',
  			extraSettings: '=',
  			events: '=',
  			searchFilter: '=?',
  			translationTexts: '=',
  			disabled: '=',
  		},
  		transclude: {
  			toggleDropdown: '?toggleDropdown',
  		},
  		controller: 'DropdownMultiselectCtrl as dropdownMultiselectCtrl',
  		templateUrl: 'templates/dropdownMultiselect.html',
  	}

})
