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
    $scope.burger = {};
    $scope.selectionToppings = [];
    $scope.selectionSauces = [];
    $http.get('/menu')
        .success(function(response) {
          $scope.menu = response;
        })
        .error(function() {
          alert('Couldn\'t get menu data. Please check your network connection.');
        });


    function Burger(meat, bun, sauces, toppings, cheeses, price, side) {
      this.meat = meat;
      this.bun = bun;
      this.sauces = sauces;
      this.toppings = toppings;
      this.cheeses = cheeses;
      this.price = price;
      this.side = side;
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
        alert('Could not place order. Check network connection and try again');
      });
    };
    
    $scope.addBurgerToOrder = function() {
    	//$scope.burger.toppings.push($scope.selectionToppings);
    	alert(JSON.stringify($scope.selectionToppings));


      var burger = new Burger(
          $scope.burger.meat,
          $scope.burger.bun,
          $scope.burger.sauces,
          $scope.burger.toppings,
          $scope.burger.cheese,
          $scope.burger.price,
          $scope.burger.side
        );
      $scope.order.burgers.push(burger);
    };



  // toggle selection for a given fruit by name
  $scope.toggleSelectionToppings = function(topping) {
    alert('test');
    var idx = $scope.selectionToppings.indexOf(topping);

    // is currently selected
    if (idx > -1) {
      $scope.selectionToppings.splice(idx, 1);
    }

    // is newly selected
    else {
      $scope.selectionToppings.push(topping);
    }
  };

    // $scope.addSideToOrder = function() {
    //   var side = {
    //     name: $scope.side.name,
    //     price: $scope.side.price
    //   };
    //   $scope.order.sides.push(side);
    // };
}
]);
