'use strict';

/* Controllers */
var sampleAppControllers = angular.module('sampleAppControllers', []);

sampleAppControllers.controller('DropdownMultiCtrl', ['$scope',
  function($scope) {

    var vm = this

    vm.options = ['Eduardo Castro','Henrique Rocha','Amanayara Sousa']

    vm.model = []

    vm.settings = {
      enableSearch: true,
      template: '{{option}}',
      showCheckAll: false,
      showUncheckAll: false,
      styleActive: true,
      checkBoxes: false,
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
