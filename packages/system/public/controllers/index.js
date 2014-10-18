'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global',
  function($scope, Global) {
    $scope.global = Global;
  }
])
.controller('OrderController', ['$scope', '$rootScope', '$http', '$location', 'Global',
  function($scope, $rootScope, $http, $location, Global) {
    $scope.global = Global;
    $scope.user = {}
    $scope.burger = {};
    $scope.side = {};
    var rowPreId = 'burger-id-';
    $scope.order = {
      burgers: []
    };

    function Burger(meat, bun, sauces, toppings, cheeses, side) {
      this.meat = meat;
      this.bun = bun;
      this.sauces = sauces;
      this.toppings = toppings;
      this.cheese = cheeses;
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

    function getUserInfo() {
      $http.get('/users/me')
        .success(function(response) {
          if (response) {
            $scope.user = {
              name: response.name,
              creditCardNumber: response.creditCardNumber,
              lastOrder: response.lastOrder
            };
            $scope.user[response.creditCardProvider] = true;
          }
        });
    }


    getMenu();
    getUserInfo();

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
          $scope.burger.meat ? JSON.parse($scope.burger.meat) : { name: 'No Meat', price: 0 },
          $scope.burger.bun ? JSON.parse($scope.burger.bun) : { name: 'No Bun', price: 0 },
          $scope.burger.sauce ? JSON.parse($scope.burger.sauce) : { name: 'No Sauce', price: 0 },
          $scope.burger.topping ? JSON.parse($scope.burger.topping) : { name: 'No Topping', price: 0 },
          $scope.burger.cheese ? JSON.parse($scope.burger.cheese) : { name: 'No Cheese', price: 0 },
          $scope.burger.side ? JSON.parse($scope.burger.side) : { name: 'No Side', price: 0 }
        );
      $scope.order.burgers.push(burger);
      var burgerIndex = $scope.order.burgers.length - 1;
      var row = $(document.createElement('tr')),
        summaryData = document.createElement('td'),
        quantityData = document.createElement('td'),
        priceData = document.createElement('td');
        /*meat = $scope.burger.meat ? JSON.parse($scope.burger.meat) : { name: 'No Meat', price: 0 },
        bun = $scope.burger.bun ? JSON.parse($scope.burger.bun) : { name: 'No Bun', price: 0 },
        sauce = $scope.burger.sauce ? JSON.parse($scope.burger.sauce) : { name: 'No Sauce', price: 0 },
        topping = $scope.burger.topping ? JSON.parse($scope.burger.topping) : { name: 'No Topping', price: 0 },
        cheese = $scope.burger.cheese ? JSON.parse($scope.burger.cheese) : { name: 'No Cheese', price: 0 },
        side = $scope.burger.side ? JSON.parse($scope.burger.side) : { name: 'No Side', price: 0 };*/

      summaryData.innerHTML = burger.meat.name + ' on ' + burger.bun.name + ' with ' + burger.sauces.name + ', ' +
        burger.toppings.name + ', ' + burger.cheese.name + ' and ' + burger.side.name;
      row.append(summaryData);

      var quantityInput = document.createElement('input');
      quantityInput.type = 'number';
      quantityInput.min = '1';
      quantityInput.value = '1';
      quantityData.appendChild(quantityInput);
      row.append(quantityData);

      priceData.innerHTML = (burger.meat.price + burger.bun.price + burger.sauces.price + 
        burger.toppings.price + burger.cheese.price + burger.side.price).toFixed(2);
      priceData.innerHTML = '$' + priceData.innerHTML;
      row.append(priceData);

      var removeButton = $(document.createElement('button'));
      removeButton.attr({ type: 'button', 'data-burger-num': burgerIndex });
      removeButton.html('X');
      removeButton.click(function(event) {
        console.log('removing burger');
        var burgerIndex = Number($(this).attr('data-burger-num'));
        $scope.order.burgers.splice(burgerIndex, 1);
        $('#' + rowPreId + burgerIndex).remove();
      });
      row.append(removeButton);
      $scope.burger = {};
      row.attr('burgerRow');
      row.attr({ id: rowPreId + burgerIndex });
      $('#order_table').append(row);
    };

    $scope.addSideToOrder = function() {
      var side = {
        name: $scope.side.name,
        price: $scope.side.price
      };
      $scope.order.sides.push(side);
    };
}])
.directive('burgerRow', ['$document', 
  function($document){
  // Runs during compile
  return function(scope, element, attr) {
        element.on('click', function(event) {
          event.preventDefault();
          element.remove();
        });
    };
}]);
