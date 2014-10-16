'use strict';

angular.module('mean.menu').controller('MenuController', ['$scope', 'Global', 'Menu',
  function($scope, Global, Menu) {
    $scope.global = Global;
    $scope.package = {
      name: 'menu'
    };
  }
]);
