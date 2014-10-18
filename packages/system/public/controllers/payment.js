'use strict';

angular.module('mean.system').controller('PaymentController', ['$scope', 'Global',
  function($scope, Global) {
    $scope.global = Global;
  }
]);