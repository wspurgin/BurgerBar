'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global',
  function($scope, Global) {
    $scope.global = Global;
  }
])
.controller('OrderController', ['$scope', '$rootScope', '$http', '$location', '$q', 'Global',
  function($scope, $rootScope, $http, $location, $q, Global) {
    $scope.global = Global;
    $scope.order = {
      burgers: [],
      sides: []
    };

    function Burger(meat, bun, sauces, toppings, cheeses, price) {
      this.meat = meat;
      this.bun = bun;
      this.sauces = sauces;
      this.toppings = toppings;
      this.cheeses = cheeses;
      this.price = price;
    }

    function getMenu() {
      $http.get('/menu')
        .success(function(response) {
          $scope.menu = response;
        })
        .error(function() {
          alert('Couldn\'t get menu data. Please check your network connection.');
        });
    }

    function getLastOrder() {
      $http.get('/users/me/last-order')
        .success(function(response) {
          $scope.lastOrder = response;
        })
        .error(function() {
          console.log('Could not get Users last order');
        });
    }

    getMenu();
    getLastOrder();

    $scope.placeOrder = function() {
      console.log('Placeing Order');
      $http.post('/users/me/new-order', {
        order: $scope.order
      })
      .success(function() {
        alert('Thank you for your order!');
        $location.url('/');
      })
      .error(function() {
        alert('Could not place order');
      });
    };
    
    $scope.addBurgerToOrder = function() {
      var burger = new Burger(
          $scope.burger.meat,
          $scope.burger.bun,
          $scope.burger.sauces,
          $scope.burger.toppings,
          $scope.burger.cheeses,
          $scope.burger.price
        );
      $scope.order.burgers.push(burger);
    };

    $scope.addSideToOrder = function() {
      var side = {
        name: $scope.side.name,
        price: $scope.side.price
      };
      $scope.order.sides.push(side);
    };
}
]);
