'use strict';

angular.module('mean.order').controller('OrderController', ['$scope', 'Global', 'Order',
  function($scope, Global, Order) {
    $scope.global = Global;
    $scope.package = {
      name: 'order'
    };
  }
]);
