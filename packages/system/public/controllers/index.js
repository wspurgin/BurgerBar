'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global',
  function($scope, Global) {
    $scope.global = Global;
  }
])
.controller('OrderController', ['$scope', '$rootScope', '$http', '$location', '$q', 'Global',
  function($scope, $rootScope, $http, $location, $q, Global) {
    $scope.global = Global;
    $scope.burger = {};
    $scope.side = {};
    $scope.order = {
      burgers: []
    };

    function Burger(meat, bun, sauces, toppings, cheeses, side) {
      this.meat = meat;
      this.bun = bun;
      this.sauces = sauces;
      this.toppings = toppings;
      this.cheeses = cheeses;
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

     var burger = new Burger(
          $scope.burger.meat,
          $scope.burger.bun,
          $scope.burger.sauce,
          $scope.burger.topping,
          $scope.burger.cheese,
          $scope.burger.side
        );
      $scope.order.burgers.push(burger);
      
      var row = document.createElement("tr");
      var summaryData = document.createElement("td");
      var quantityData = document.createElement("td");
      var priceData = document.createElement("td");
      
      var meat = JSON.parse($scope.burger.meat);
      var bun = JSON.parse($scope.burger.bun);
      var sauce = JSON.parse($scope.burger.sauce);
      var topping = JSON.parse($scope.burger.topping);
      var cheese = JSON.parse($scope.burger.cheese);
      var side = JSON.parse($scope.burger.side);

      summaryData.innerHTML = meat.name + " on " + bun.name + " with " + sauce.name + ", " 
      + topping.name + ", " + cheese.name + " and " + side.name;
      row.appendChild(summaryData);

      var quantityInput = document.createElement("input");
      quantityInput.type = "number";
      quantityInput.min = "1";
      quantityInput.value = "1";
      quantityData.appendChild(quantityInput);

      row.appendChild(quantityData);

      priceData.innerHTML = meat.price + bun.price + sauce.price + topping.price + cheese.price + side.price;
      priceData.innerHTML = "$" + priceData.innerHTML;
      row.appendChild(priceData);

      document.getElementById("order_table").appendChild(row);
    };
}]);
