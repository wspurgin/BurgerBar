'use strict';

angular.module('mean.order').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('order example page', {
      url: '/order/example',
      templateUrl: 'order/views/index.html'
    });
  }
]);
