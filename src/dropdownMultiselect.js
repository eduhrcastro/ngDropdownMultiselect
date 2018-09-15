let dropdownMulti = angular.module('ngDropdownMultiselect', [])

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
  		templateUrl: 'src/dropdownMultiselect.html',
  	}

})
