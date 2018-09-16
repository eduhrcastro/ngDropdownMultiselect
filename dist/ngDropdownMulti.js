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

dropdownMulti.controller('DropdownMultiselectCtrl', function ($scope, $element, $filter, $document) {

	function contains(collection, target) {
		var containsTarget = false;
		collection.some(function (object) {
			if (object === target) {
				containsTarget = true;
				return true;
			}
			return false;
		});
		return containsTarget;
	}

	function getIndexByProperty(collection, objectToFind, property) {
		var index = -1;
		collection.some(function (option, ind) {
			if (option[property] === objectToFind[property]) {
				index = ind;
				return true;
			}
			return false;
		});
		return index;
	}

	var $dropdownTrigger = $element.children()[0];
	var externalEvents = {
		onItemSelect: angular.noop,
		onItemDeselect: angular.noop,
		onSelectAll: angular.noop,
		onDeselectAll: angular.noop,
		onInitDone: angular.noop,
		onMaxSelectionReached: angular.noop,
		onSelectionChanged: angular.noop,
		onClose: angular.noop
	};

	var settings = {
		dynamicTitle: true,
		scrollable: false,
		scrollableHeight: '300px',
		closeOnBlur: true,
		displayProp: 'label',
		enableSearch: false,
		clearSearchOnClose: false,
		selectionLimit: 0,
		showCheckAll: true,
		showUncheckAll: true,
		showEnableSearchButton: false,
		closeOnSelect: false,
		buttonClasses: 'btn btn-default',
		closeOnDeselect: false,
		groupBy: undefined,
		checkBoxes: false,
		groupByTextProvider: null,
		smartButtonMaxItems: 0,
		smartButtonTextConverter: angular.noop,
		styleActive: false,
		selectedToTop: false,
		keyboardControls: false,
		template: '{{getPropertyForObject(option, settings.displayProp)}}',
		searchField: '$',
		showAllSelectedText: false
	};

	var texts = {
		checkAll: 'Check All',
		uncheckAll: 'Uncheck All',
		selectionCount: 'checked',
		selectionOf: '/',
		searchPlaceholder: 'Search...',
		buttonDefaultText: 'Select',
		dynamicButtonTextSuffix: 'checked',
		disableSearch: 'Disable search',
		enableSearch: 'Enable search',
		selectGroup: 'Select all:',
		allSelectedText: 'All'
	};

	var input = {
		searchFilter: $scope.searchFilter || ''
	};

	angular.extend(settings, $scope.extraSettings || []);
	angular.extend(externalEvents, $scope.events || []);
	angular.extend(texts, $scope.translationTexts);

	if (settings.closeOnBlur) {
		$document.on('click', function (e) {
			closeOnClick(e);
		});
		angular.element('.modal-content').on('click', function (e) {
			closeOnClick(e);
		});
	}

	function closeOnClick(e) {
		if ($scope.open) {
			var target = e.target.parentElement;
			var parentFound = false;

			while (angular.isDefined(target) && target !== null && !parentFound) {
				if (!!target.className.split && contains(target.className.split(' '), 'multiselect-parent') && !parentFound) {
					if (target === $dropdownTrigger) {
						parentFound = true;
					}
				}
				target = target.parentElement;
			}

			if (!parentFound) {
				$scope.$apply(function () {
					$scope.close();
				});
			}
		}
	}

	angular.extend($scope, {
		toggleDropdown: toggleDropdown,
		checkboxClick: checkboxClick,
		externalEvents: externalEvents,
		settings: settings,
		texts: texts,
		input: input,
		close: close,
		selectCurrentGroup: selectCurrentGroup,
		getGroupLabel: getGroupLabel,
		getButtonText: getButtonText,
		getPropertyForObject: getPropertyForObject,
		selectAll: selectAll,
		deselectAll: deselectAll,
		setSelectedItem: setSelectedItem,
		isChecked: isChecked,
		keyDownLink: keyDownLink,
		keyDownSearchDefault: keyDownSearchDefault,
		keyDownSearch: keyDownSearch,
		getFilter: getFilter,
		toggleSearch: toggleSearch,
		keyDownToggleSearch: keyDownToggleSearch,
		orderFunction: orderFunction
	});

	$scope.externalEvents.onInitDone();

	function focusFirstOption() {
		setTimeout(function () {
			var elementToFocus = angular.element($element)[0].querySelector('.option');
			if (angular.isDefined(elementToFocus) && elementToFocus != null) {
				elementToFocus.focus();
			}
		}, 0);
	}

	function toggleDropdown() {
		if ($scope.open) {
			$scope.close();
		} else {
			$scope.open = true;
		}
		if ($scope.settings.keyboardControls) {
			if ($scope.open) {
				if ($scope.settings.selectionLimit === 1 && $scope.settings.enableSearch) {
					setTimeout(function () {
						angular.element($element)[0].querySelector('.searchField').focus();
					}, 0);
				} else {
					focusFirstOption();
				}
			}
		}
		if ($scope.settings.enableSearch) {
			if ($scope.open) {
				setTimeout(function () {
					angular.element($element)[0].querySelector('.searchField').focus();
				}, 0);
			}
		}
	}

	function checkboxClick($event, option) {
		$scope.setSelectedItem(option, false, true);
		$event.stopImmediatePropagation();
	}

	function close() {
		$scope.open = false;
		$scope.input.searchFilter = $scope.settings.clearSearchOnClose ? '' : $scope.input.searchFilter;
		$scope.externalEvents.onClose();
	}

	function selectCurrentGroup(currentGroup) {
		$scope.selectedModel.splice(0, $scope.selectedModel.length);
		$scope.options.forEach(function (item) {
			if (item[$scope.settings.groupBy] === currentGroup) {
				$scope.setSelectedItem(item, false, false);
			}
		});
		$scope.externalEvents.onSelectionChanged();
	}

	function getGroupLabel(groupValue) {
		if ($scope.settings.groupByTextProvider !== null) {
			return $scope.settings.groupByTextProvider(groupValue);
		}

		return groupValue;
	}

	function textWidth(text) {
		var $btn = $element.find('button');
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		ctx.font = $btn.css('font-size') + $btn.css('font-family');
		// http://stackoverflow.com/questions/38823353/chrome-canvas-2d-context-measuretext-giving-me-weird-results
		ctx.originalFont = $btn.css('font-size') + $btn.css('font-family');
		ctx.fillStyle = '#000000';
		return ctx.measureText(text).width;
	}

	function getButtonText() {
		if ($scope.settings.dynamicTitle && $scope.selectedModel && $scope.selectedModel.length > 0) {
			if (angular.isFunction($scope.settings.smartButtonTextProvider)) {
				return $scope.settings.smartButtonTextProvider($scope.selectedModel);
			}

			if ($scope.settings.smartButtonMaxItems > 0) {
				var paddingWidth = 12 * 2;
				var borderWidth = 1 * 2;
				var dropdownIconWidth = 8;
				var widthLimit = $element[0].offsetWidth - paddingWidth - borderWidth - dropdownIconWidth;

				var itemsText = [];

				angular.forEach($scope.options, function (optionItem) {
					if ($scope.isChecked(optionItem)) {
						var displayText = $scope.getPropertyForObject(optionItem, $scope.settings.displayProp);
						var converterResponse = $scope.settings.smartButtonTextConverter(displayText, optionItem);

						itemsText.push(converterResponse || displayText);
					}
				});

				if ($scope.selectedModel.length > $scope.settings.smartButtonMaxItems) {
					itemsText = itemsText.slice(0, $scope.settings.smartButtonMaxItems);
					itemsText.push('...');
				}

				var result = itemsText.join(', ');
				var index = result.length - 4;
				if ($element[0].offsetWidth === 0) {
					return result;
				}
				if (widthLimit <= textWidth('...')) {
					return '...';
				}
				while (textWidth(result) > widthLimit) {
					if (itemsText[itemsText.length - 1] !== '...') {
						itemsText.push('...');
						result = result + '...';
						index = result.length - 4;
					}
					result = result.slice(0, index) + result.slice(index + 1);
					index -= 1;
				}

				return result;
			}
			var totalSelected = angular.isDefined($scope.selectedModel) ? $scope.selectedModel.length : 0;

			if (totalSelected === 0) {
				return $scope.texts.buttonDefaultText;
			}

			if ($scope.settings.showAllSelectedText && totalSelected === $scope.options.length) {
				return $scope.texts.allSelectedText;
			}

			return totalSelected + ' ' + $scope.texts.dynamicButtonTextSuffix;
		}
		return $scope.texts.buttonDefaultText;
	}

	function getPropertyForObject(object, property) {
		if (angular.isDefined(object) && Object.prototype.hasOwnProperty.call(object, property)) {
			return object[property];
		}

		return undefined;
	}

	function selectAll() {
		$scope.deselectAll(true);
		$scope.externalEvents.onSelectAll();

		var searchResult = $filter('filter')($scope.options, $scope.getFilter($scope.input.searchFilter));
		angular.forEach(searchResult, function (value) {
			$scope.setSelectedItem(value, true, false);
		});
		$scope.externalEvents.onSelectionChanged();
		$scope.selectedGroup = null;
	}

	function deselectAll() {
		var dontSendEvent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

		if (!dontSendEvent) {
			$scope.externalEvents.onDeselectAll();
		}

		$scope.selectedModel.splice(0, $scope.selectedModel.length);
		if (!dontSendEvent) {
			$scope.externalEvents.onSelectionChanged();
		}
		$scope.selectedGroup = null;
	}

	function setSelectedItem(option) {
		var dontRemove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
		var fireSelectionChange = arguments[2];

		var exists = void 0;
		var indexOfOption = void 0;
		if (angular.isDefined(settings.idProperty)) {
			exists = getIndexByProperty($scope.selectedModel, option, settings.idProperty) !== -1;
			indexOfOption = getIndexByProperty($scope.selectedModel, option, settings.idProperty);
		} else {
			exists = $scope.selectedModel.indexOf(option) !== -1;
			indexOfOption = $scope.selectedModel.indexOf(option);
		}

		if (!dontRemove && exists) {
			$scope.selectedModel.splice(indexOfOption, 1);
			$scope.externalEvents.onItemDeselect(option);
			if ($scope.settings.closeOnDeselect) {
				$scope.close();
			}
		} else if (!exists && ($scope.settings.selectionLimit === 0 || $scope.selectedModel.length < $scope.settings.selectionLimit)) {
			$scope.selectedModel.push(option);
			if (fireSelectionChange) {
				$scope.externalEvents.onItemSelect(option);
			}
			if ($scope.settings.closeOnSelect) {
				$scope.close();
			}
			if ($scope.settings.selectionLimit > 0 && $scope.selectedModel.length === $scope.settings.selectionLimit) {
				$scope.externalEvents.onMaxSelectionReached();
			}
		} else if ($scope.settings.selectionLimit === 1 && !exists && $scope.selectedModel.length === $scope.settings.selectionLimit) {
			$scope.selectedModel.splice(0, 1);
			$scope.selectedModel.push(option);
			if (fireSelectionChange) {
				$scope.externalEvents.onItemSelect(option);
			}
			if ($scope.settings.closeOnSelect) {
				$scope.close();
			}
		}
		if (fireSelectionChange) {
			$scope.externalEvents.onSelectionChanged();
		}
		$scope.selectedGroup = null;
	}

	function isChecked(option) {
		if (angular.isDefined(settings.idProperty)) {
			return getIndexByProperty($scope.selectedModel, option, settings.idProperty) !== -1;
		}
		return $scope.selectedModel.indexOf(option) !== -1;
	}

	function keyDownLink(event) {
		var sourceScope = angular.element(event.target).scope();
		var nextOption = void 0;
		var parent = event.target.parentNode;
		if (!$scope.settings.keyboardControls) {
			return;
		}
		if (event.keyCode === 13 || event.keyCode === 32) {
			// enter
			event.preventDefault();
			if (sourceScope.option) {
				$scope.setSelectedItem(sourceScope.option, false, true);
			} else if (event.target.id === 'deselectAll') {
				$scope.deselectAll();
			} else if (event.target.id === 'selectAll') {
				$scope.selectAll();
			}
		} else if (event.keyCode === 38) {
			// up arrow
			event.preventDefault();
			if (parent.previousElementSibling) {
				nextOption = parent.previousElementSibling.querySelector('a') || parent.previousElementSibling.querySelector('input');
			}
			while (!nextOption && !!parent) {
				parent = parent.previousElementSibling;
				if (parent) {
					nextOption = parent.querySelector('a') || parent.querySelector('input');
				}
			}
			if (nextOption) {
				nextOption.focus();
			}
		} else if (event.keyCode === 40) {
			// down arrow
			event.preventDefault();
			if (parent.nextElementSibling) {
				nextOption = parent.nextElementSibling.querySelector('a') || parent.nextElementSibling.querySelector('input');
			}
			while (!nextOption && !!parent) {
				parent = parent.nextElementSibling;
				if (parent) {
					nextOption = parent.querySelector('a') || parent.querySelector('input');
				}
			}
			if (nextOption) {
				nextOption.focus();
			}
		} else if (event.keyCode === 27) {
			event.preventDefault();

			$scope.toggleDropdown();
		}
	}

	function keyDownSearchDefault(event) {
		var parent = event.target.parentNode.parentNode;
		var nextOption = void 0;
		if (!$scope.settings.keyboardControls) {
			return;
		}
		if (event.keyCode === 9 || event.keyCode === 40) {
			// tab
			event.preventDefault();
			focusFirstOption();
		} else if (event.keyCode === 38) {
			event.preventDefault();
			if (parent.previousElementSibling) {
				nextOption = parent.previousElementSibling.querySelector('a') || parent.previousElementSibling.querySelector('input');
			}
			while (!nextOption && !!parent) {
				parent = parent.previousElementSibling;
				if (parent) {
					nextOption = parent.querySelector('a') || parent.querySelector('input');
				}
			}
			if (nextOption) {
				nextOption.focus();
			}
		} else if (event.keyCode === 27) {
			event.preventDefault();

			$scope.toggleDropdown();
		}
	}

	function keyDownSearch(event, searchFilter) {
		var searchResult = void 0;
		if (!$scope.settings.keyboardControls) {
			return;
		}
		if (event.keyCode === 13) {
			if ($scope.settings.selectionLimit === 1 && $scope.settings.enableSearch) {
				searchResult = $filter('filter')($scope.options, $scope.getFilter(searchFilter));
				if (searchResult.length === 1) {
					$scope.setSelectedItem(searchResult[0], false, true);
				}
			} else if ($scope.settings.enableSearch) {
				$scope.selectAll();
			}
		}
	}

	function getFilter(searchFilter) {
		var filter = {};
		filter[$scope.settings.searchField] = searchFilter;
		return filter;
	}

	function toggleSearch($event) {
		if ($event) {
			$event.stopPropagation();
		}
		$scope.settings.enableSearch = !$scope.settings.enableSearch;
		if (!$scope.settings.enableSearch) {
			$scope.input.searchFilter = '';
		}
	}

	function keyDownToggleSearch() {
		if (!$scope.settings.keyboardControls) {
			return;
		}
		if (event.keyCode === 13) {
			$scope.toggleSearch();
			if ($scope.settings.enableSearch) {
				setTimeout(function () {
					angular.element($element)[0].querySelector('.searchField').focus();
				}, 0);
			} else {
				focusFirstOption();
			}
		}
	}

	function orderFunction(object1, object2) {
		if (angular.isUndefined(object2)) {
			return -1;
		}
		if (angular.isUndefined(object1)) {
			return 1;
		}
		if (object1.type !== 'object' || object2.type !== 'object') {
			return object1.index < object2.index ? -1 : 1;
		}
		var v1 = object1.value;
		var v2 = object2.value;
		// first order by group
		if ($scope.settings.groupBy) {
			if (v1[$scope.settings.groupBy] !== v2[$scope.settings.groupBy]) {
				if (v1[$scope.settings.groupBy] < v2[$scope.settings.groupBy]) {
					return 1;
				}
				return -1;
			}
		}
		if (!$scope.settings.selectedToTop) {
			return $scope.options.indexOf(v1) < $scope.options.indexOf(v2) ? -1 : 1;
		}
		// then order selected to top
		if (!$scope.isChecked(v1) && !$scope.isChecked(v2) || $scope.isChecked(v1) && $scope.isChecked(v2)) {
			return $scope.options.indexOf(v1) < $scope.options.indexOf(v2) ? -1 : 1;
		}
		if ($scope.isChecked(v1)) {
			return -1;
		}
		return 1;
	}
});
'use strict';

var dropdownMulti = angular.module('ngDropdownMulti');

dropdownMulti.directive('dmDropdownStaticInclude', function ($compile) {

	return {
		link: function link(scope, iElement, iAttrs, ngModelCtrl) {
			var template = iAttrs.dmDropdownStaticInclude;
			var contents = iElement.html(template).contents();
			$compile(contents)(scope);
		}
	};
});
'use strict';

var dropdownMulti = angular.module('ngDropdownMulti');

dropdownMulti.directive('dropdownMultiselect', function () {

	return {
		restrict: 'AE',
		scope: {
			selectedModel: '=',
			options: '=',
			extraSettings: '=',
			events: '=',
			searchFilter: '=?',
			translationTexts: '=',
			disabled: '='
		},
		transclude: {
			toggleDropdown: '?toggleDropdown'
		},
		controller: 'DropdownMultiselectCtrl as dropdownMultiselectCtrl',
		templateUrl: 'templates/dropdownMultiselect.html'
	};
});
'use strict';

angular.module('ngDropdownMulti').run(['$templateCache', function ($templateCache) {
	$templateCache.put('templates/dropdownMultiselect.html', '<div class="multiselect-parent btn-group dropdown dropdown-multiselect" ng-class="{open: open}">\n' + '   <div ng-transclude="toggleDropdown" ng-click="toggleDropdown()">\n' + '     <button ng-disabled="disabled" type="button" class="dropdown-toggle" ng-class="settings.buttonClasses">{{getButtonText()}}</button>\n' + '   </div>\n' + '   <ul class="dropdown-menu" ng-if="open" ng-style="{display: open ? \'block\' : \'none\', height : settings.scrollable ? settings.scrollableHeight : \'auto\', overflow: \'auto\' }">\n' + '    <li class="dropdown-item" ng-if="settings.showCheckAll && settings.selectionLimit === 0">\n' + '      <a ng-keydown="keyDownLink($event)" style="text-decoration: none; cursor: pointer;" data-ng-click="selectAll()" tabindex="-1" id="selectAll">\n' + '        <i class="fa fa-check"></i>\n' + '        {{texts.checkAll}}\n' + '      </a>\n' + '    <li class="dropdown-item" ng-if="settings.showUncheckAll">\n' + '      <a ng-keydown="keyDownLink($event)" style="text-decoration: none; cursor: pointer;" data-ng-click="deselectAll();" tabindex="-1" id="deselectAll">\n' + '        <i class="fa fa-trash-alt"></i>\n' + '        {{texts.uncheckAll}}\n' + '      </a>\n' + '    </li>\n' + '    <li class="dropdown-divider" ng-if="settings.selectByGroups && ((settings.showCheckAll && settings.selectionLimit > 0) || settings.showUncheckAll)"></li>\n' + '    <li class="dropdown-item" ng-repeat="currentGroup in settings.selectByGroups track by $index" ng-click="selectCurrentGroup(currentGroup)">\n' + '      <a ng-class="{\'dropdown-selected-group\': selectedGroup === currentGroup}" tabindex="-1">\n' + '        {{::texts.selectGroup}} {{::getGroupLabel(currentGroup)}}\n' + '      </a>\n' + '    </li>\n' + '    <li class="dropdown-divider" ng-if="settings.selectByGroups && settings.showEnableSearchButton">\n' + '    </li>\n' + '    <li class="dropdown-divider" ng-if="settings.showEnableSearchButton && settings.enableSearch">\n' + '      <a ng-keydown="keyDownLink($event); keyDownToggleSearch();" style="text-decoration: none; cursor: pointer;" ng-click="toggleSearch($event);" tabindex="-1">\n' + '        {{texts.disableSearch}}\n' + '      </a>\n' + '    </li>\n' + '    <li class="dropdown-item" ng-if="settings.showEnableSearchButton && !settings.enableSearch">\n' + '      <a ng-keydown="keyDownLink($event); keyDownToggleSearch();" style="text-decoration: none; cursor: pointer;" ng-click="toggleSearch($event);" tabindex="-1">\n' + '        {{texts.enableSearch}}\n' + '      </a>\n' + '    </li>\n' + '    <li class="dropdown-divider" ng-if="(settings.showCheckAll && settings.selectionLimit > 0) || settings.showUncheckAll || settings.showEnableSearchButton"></li>\n' + '    <li ng-if="settings.enableSearch">\n' + '      <div class="dropdown-header">\n' + '        <input type="text" class="form-control searchField" ng-keydown="keyDownSearchDefault($event); keyDownSearch($event, input.searchFilter);" ng-style="{width: \'100%\'}" ng-model="input.searchFilter" placeholder="{{texts.searchPlaceholder}}" />\n' + '      </div>\n' + '    </li>\n' + '    <li class="dropdown-divider" ng-if="settings.enableSearch"></li>\n' + '    <li class="dropdown-header" ng-if="settings.groupBy" ng-repeat-start="option in orderedItems = ( options | filter:getFilter(input.searchFilter) | orderBy:\'\':false:orderFunction)" ng-show="getPropertyForObject(option, settings.groupBy) !== getPropertyForObject(orderedItems[$index - 1], settings.groupBy)" role="presentation">\n' + '      {{ getGroupLabel(getPropertyForObject(option, settings.groupBy)) }}\n' + '    </li>\n' + '    <li class="dropdown-item" ng-if="settings.groupBy" ng-class="{\'active\': isChecked(option) && settings.styleActive}" ng-repeat-end role="presentation">\n' + '      <a ng-keydown="option.disabled || keyDownLink($event)" style="text-decoration: none; cursor: pointer;" role="menuitem" class="option" tabindex="-1" ng-click="option.disabled || setSelectedItem(option, false, true)" ng-disabled="option.disabled">\n' + '        <div ng-if="settings.checkBoxes" class="checkbox">\n' + '          <label>\n' + '            <input class="checkboxInput" type="checkbox" ng-click="checkboxClick($event, option)" ng-checked="isChecked(option)" />\n' + '            <span dm-dropdown-static-include="{{settings.template}}"></span>\n' + '          </label>\n' + '        </div>\n' + '        <span ng-if="!settings.checkBoxes" data-ng-class="{\'fa fa-check\': isChecked(option)}">\n' + '        </span>\n' + '        <span dm-dropdown-static-include="{{settings.template}}"></span>\n' + '      </a>\n' + '    </li>\n' + '    <li class="dropdown-item" ng-if="!settings.groupBy" ng-class="{\'active\': isChecked(option) && settings.styleActive}" role="presentation" ng-repeat="option in options | filter:getFilter(input.searchFilter) | orderBy:\'\':false:orderFunction">\n' + '      <a ng-keydown="option.disabled || keyDownLink($event)" style="text-decoration: none; cursor: pointer;" role="menuitem" class="option" tabindex="-1" ng-click="option.disabled || setSelectedItem(option, false, true)" ng-disabled="option.disabled">\n' + '        <div ng-if="settings.checkBoxes" class="checkbox">\n' + '          <label>\n' + '            <input class="checkboxInput" type="checkbox" ng-click="checkboxClick($event, option)" ng-checked="isChecked(option)" />\n' + '            <span dm-dropdown-static-include="{{settings.template}}"></span>\n' + '          </label>\n' + '        </div>\n' + '        <span ng-if="!settings.checkBoxes" data-ng-class="{\'fa fa-check\': isChecked(option)}">\n' + '        </span>\n' + '        <span ng-if="!settings.checkBoxes" dm-dropdown-static-include="{{settings.template}}"></span>\n' + '      </a>\n' + '    </li>\n' + '    <li class="dropdown-divider" ng-show="settings.selectionLimit > 1">\n' + '    </li>\n' + '    <li class="dropdown-item" role="presentation" ng-show="settings.selectionLimit > 1">\n' + '      <a role="menuitem">{{selectedModel.length}} {{texts.selectionOf}} {{settings.selectionLimit}} {{texts.selectionCount}}</a>\n' + '    </li>\n' + '  </ul>\n' + '</div>\n' + '');
}]);

exports.ngDropdownMulti = NgDropdownMulti;
}));
