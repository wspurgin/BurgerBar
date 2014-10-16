'use strict';

angular.module('mean.menu').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('menu example page', {
      url: '/menu',
      templateUrl: 'menu/views/index.html'
    });
  }
]);
