'use strict';

angular.module('mean.system').controller('OrderController', ['$scope', 'Global',
  function($scope, Global) {
    $scope.global = Global;
  }
]);