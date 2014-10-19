'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global',
  function($scope, Global) {
    $scope.global = Global;
  }
])
.controller('OrderController', ['$scope', '$rootScope', '$http', '$location', 'Global',
  function($scope, $rootScope, $http, $location, Global) {
    $scope.global = Global;
    $scope.user = {};
    $scope.sides = [];
    var rowPreId = 'burger-id-';
    $scope.order = {
      burgers: []
    };

    function Burger() {
      this.empty();
    }

    Burger.prototype.empty = function() {
        this.meat = null;
        this.bun = null;
        this.sauces = [];
        this.toppings = [];
        this.cheeses = [];
        this.side = null;
    };

    // Declare scope burger
    $scope.burger = new Burger();

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

    // toggle selection for a given fruit by name
    $scope.toggleSelection = function(collection, item) {
      var idx = $scope.burger[collection].indexOf(item);
      // is currently selected
      if (idx > -1) {
        $scope.burger[collection].splice(idx, 1);
      } else {
        $scope.burger[collection].push(item);
      }
    };

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
      // init burger
      var burger = new Burger();
      burger.meat = $scope.burger.meat ? JSON.parse($scope.burger.meat) : { name: 'No Meat', price: 0 };
      burger.bun = $scope.burger.bun ? JSON.parse($scope.burger.bun) : { name: 'No Bun', price: 0 };
      console.log($scope.burger);
      if($scope.burger.sauces.length){
        for(var i = 0; i < $scope.burger.sauces.length; i++) {
          if ($scope.burger.sauces[i]){
            burger.sauces.push($scope.menu.sauces[i]);
          }
        }
      } else {
        burger.sauces.push({ name: 'No Sauce', price: 0 });
      }
      if($scope.burger.toppings.length){
        for(var i = 0; i < $scope.burger.toppings.length; i++) {
          if ($scope.burger.toppings[i]) {
            burger.toppings.push($scope.menu.topping[i]);
          }
        }
      } else { 
        burger.toppings.push({ name: 'No Topping', price: 0 });
      }
      if($scope.burger.cheeses.length){
        for(var i = 0; i < $scope.burger.cheeses.length; i++) {
          if ($scope.burger.cheeses[i]) {
            burger.cheeses.push($scope.menu.cheeses[i]);
          }
        }
      } else {
        burger.cheeses.push({ name: 'No Cheese', price: 0 });
      }
      burger.side = $scope.burger.side ? JSON.parse($scope.burger.side) : { name: 'No Side', price: 0 };
      console.log(burger);
      $scope.order.burgers.push(burger);
      
      // create new row in summary
      var burgerIndex = $scope.order.burgers.length - 1;
      var row = $(document.createElement('tr')),
        summaryData = document.createElement('td'),
        quantityData = document.createElement('td'),
        priceData = document.createElement('td');

      summaryData.innerHTML = burger.meat.name + ' on ' + 
      burger.bun.name + ' with ' + 
      burger.sauces.reduce(function(a, b) { return a !== false ? a + ' and ' + b.name : b.name; }, false) + 
      ', ' + burger.toppings.reduce(function(a, b) { return a !== false ? a + ' and ' + b.name : b.name; }, false) + 
      ', ' + burger.cheeses.reduce(function(a, b) { return a !== false ? a + ' and ' + b.name : b.name; }, false) + 
      ', ' + burger.side.name;
      row.append(summaryData);

      var quantityInput = document.createElement('input');
      quantityInput.type = 'number';
      quantityInput.min = '1';
      quantityInput.value = '1';
      quantityData.appendChild(quantityInput);
      row.append(quantityData);

      priceData.innerHTML = (
        burger.meat.price + 
        burger.bun.price + 
        burger.sauces.reduce(function(a,b){ return a !== false ? a + b.price : b.price; }, false) + 
        burger.toppings.reduce(function(a,b){ return a !== false ? a + b.price : b.price; }, false) + 
        burger.cheeses.reduce(function(a,b){ return a !== false ? a + b.price : b.price; }, false) + 
        burger.side.price
        ).toFixed(2);
      priceData.innerHTML = '$' + priceData.innerHTML;
      row.append(priceData);

      var removeButton = $(document.createElement('button'));
      removeButton.attr({ type: 'button', 'data-burger-num': burgerIndex });
      removeButton.html('X');
      
      // add event listner to remove order
      removeButton.click(function(event) {
        console.log('removing burger');
        var burgerIndex = Number($(this).attr('data-burger-num'));
        $scope.order.burgers.splice(burgerIndex, 1);
        $('#' + rowPreId + burgerIndex).remove();
      });
      row.append(removeButton);
      
      // empty out the form model
      $scope.burger.empty();

      // append data to order table
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
}]);
