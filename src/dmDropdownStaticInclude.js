let dropdownMulti = angular.module('ngDropdownMulti')

dropdownMulti.directive('dmDropdownStaticInclude', ($compile) => {

  	return {
      link: (scope, iElement, iAttrs, ngModelCtrl) => {
        const template = iAttrs.dmDropdownStaticInclude;
    		const contents = iElement.html(template).contents();
    		$compile(contents)(scope);
      }
  	}

})
