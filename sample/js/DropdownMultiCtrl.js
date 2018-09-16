'use strict';

/* Controllers */
var sampleAppControllers = angular.module('sampleAppControllers', []);

sampleAppControllers.controller('DropdownMultiCtrl', ['$scope',
  function($scope) {

    var vm = this

    vm.options = [{id: 1, label: 'Eduardo Castro'},{id: 2, label: 'Henrique Rocha'},{id: 3 , label: 'Amanayara Sousa'}]

    vm.model = [vm.options[0],vm.options[2]]

    vm.settings = {
      enableSearch: true,
      template: '{{option.label}}',
      showCheckAll: false,
      showUncheckAll: false,
      styleActive: true,
      checkBoxes: true,
      buttonClasses: 'btn btn-primary'
    }

    vm.translates = {
      checkAll: 'Marcar Todos',
      uncheckAll: 'Desmarcar Todos',
      enableSearch: 'Habilitar Pesquisa',
      disableSearch: 'Desabilitar Pesquisa',
      selectionCount: 'selecionado',
      selectionOf: '/',
      searchPlaceholder: 'Pesquisar',
      buttonDefaultText: 'Selecionar',
      dynamicButtonTextSuffix: 'selecionado',
      selectGroup: 'Selecionar Tudo:'
    }

  }]);
