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
    $scope.user.creditCardNumber = null;
    $scope.creditCardProvider = null;
    $scope.mismatchError = false;
    $scope.providerErrorMessage = null;
    $scope.pattern = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13})$/;
    $scope.cards = [
      { name: 'Visa', value: 'visa' },
      { name: 'Master Card', value: 'master_card' },
      { name: 'American Express', value: 'american_express' }
    ];
    $scope.sides = [];
    
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

    function displayLastOrder() {
      console.log($scope.user);
      if ($scope.user) {
          $scope.user.lastOrder.burgers.forEach(function(burger) {
          displayBurger(burger, $('#last_order_table'), false);
        });
      }
    }

    function getUserInfo() {
      $http.get('/users/me')
        .success(function(response) {
          if (response) {
            $scope.user = {
              name: response.name,
              creditCardNumber: response.creditCardNumber,
              lastOrder: response.lastOrder,
              creditCardProvider: response.creditCardProvider
            };
            if (response.lastOrder) displayLastOrder();
          }
        });
    }

    /**
     * @param burger: an instance of burger class
     * @param orderTable: the JQuery object of the DOM element to append the display row
     * @param allowModify: a Boolean to specify if the remove button and quantity input should be displayed.
     */
    function displayBurger(burger, orderTable, allowModify) {
      var row = $(document.createElement('tr')),
        summaryData = document.createElement('td'),
        quantityData = document.createElement('td'),
        priceData = document.createElement('td'),
        rowPreId = 'burger-id-';

      if (allowModify === true) row.attr({ id: rowPreId + $scope.currentBurgerIndex });
      summaryData.innerHTML = burger.meat.name + ' on ' + 
      burger.bun.name + ' with ' + 
      burger.sauces.reduce(function(a, b) { return a !== false ? a + ' and ' + b.name : b.name; }, false) + 
      ', ' + burger.toppings.reduce(function(a, b) { return a !== false ? a + ' and ' + b.name : b.name; }, false) + 
      ', ' + burger.cheeses.reduce(function(a, b) { return a !== false ? a + ' and ' + b.name : b.name; }, false) + 
      ', ' + burger.side.name;
      row.append(summaryData);

      if (allowModify === true) {
        var quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.min = '1';
        quantityInput.value = '1';
        $(quantityInput).change(function(event) {
          $scope.order.burgers[$scope.currentBurgerIndex].quantity = Number($(this).val());
          $('#priceForBurger' + $scope.currentBurgerIndex).empty().html('$' + ($scope.order.burgers[$scope.currentBurgerIndex].price * Number($(this).val())).toFixed(2));
          console.log($scope.order.burgers[$scope.currentBurgerIndex]);
        });
        quantityData.appendChild(quantityInput);
        row.append(quantityData);
      } else {
        $(quantityData).html(burger.quantity);
        row.append(quantityData);
      }

      if(allowModify === true) $(priceData).attr('id', 'priceForBurger' + $scope.currentBurgerIndex);
      priceData.innerHTML = burger.price;
      priceData.innerHTML = '$' + priceData.innerHTML;
      row.append(priceData);

      if(allowModify) {
        var removeButton = $(document.createElement('button'));
        removeButton.attr({ type: 'button', 'data-burger-num': $scope.currentBurgerIndex });
        removeButton.html('X');
        
        // add event listner to remove order
        removeButton.click(function(event) {
          var burgerIndex = Number($(this).attr('data-burger-num'));
          $scope.order.burgers.splice(burgerIndex, 1);
          $('#' + rowPreId + burgerIndex).remove();
        });
        row.append(removeButton);
      }

      // append data to order table
      orderTable.append(row);
    }

    /* 
     * Bootstraping menu and user data.
     */
    getMenu();
    getUserInfo();

    $scope.testForProvider = function() {
      // test the different credit card types
      console.log('testing input');
      var visa = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/,
        masterCard = /^(5[1-5][0-9]{14})$/,
        americanExpress = /^(3[47][0-9]{13})$/;
      $scope.isVisa = false;
      $scope.isMasterCard = false;
      $scope.isAmericanExpress = false;
      switch(true) {
        case visa.test($scope.user.creditCardNumber):
          $scope.isVisa = true;
          break;
        case masterCard.test($scope.user.creditCardNumber):
          $scope.isMasterCard = true;
          break;
        case americanExpress.test($scope.user.creditCardNumber):
          $scope.isAmericanExpress = true;
          break;
        default:
      }
      return $scope.isVisa || $scope.isMasterCard || $scope.isAmericanExpress;
    };

    function _order(order) {
      if (!$scope.testForProvider() || $scope.creditCardProvider === null) {
        $scope.mismatchError = true;
        $scope.providerErrorMessage = 'Please Select a Credit Card Provider';
      } else if (($scope.creditCardProvider.value !== 'visa' && $scope.isVisa) ||
                  ($scope.creditCardProvider.value !== 'master_card' && $scope.isMasterCard) ||
                  ($scope.creditCardProvider.value !== 'american_express' && $scope.isAmericanExpress)) {
        $scope.mismatchError = true;
        $scope.providerErrorMessage = 'Credit Card Number is not a ' + $scope.creditCardProvider.name;
      } else if (order.burgers.length <= 0) {
        alert('You haven\'t ordered anything yet!');
      } else {
        $scope.mismatchError = false;
        $http.post('/users/me/new-order', {
          order: order
        })
        .success(function() {
          alert('Thank you for your order!');
          window.location.reload();
        })
        .error(function() {
          alert('Could not place order. Check network connection and try again');
        });
      }
    }

    $scope.selectProvider = function() {
      $('form[name="payment"] > select').children().each(function(option) {
        if($scope.user[option.val()] === true)
          option.attr('selected', 'true');
      })
    }

    $scope.placeOrder = function() {
      event.preventDefault();
      console.log($scope.creditCardProvider, $scope.testForProvider());
      _order($scope.order);
    };

    $scope.lastOrder = function() {
      event.preventDefault();
      console.log($scope.user.lastOrder);
      _order($scope.user.lastOrder);
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
      burger.price = (
        burger.meat.price + 
        burger.bun.price + 
        burger.sauces.reduce(function(a,b){ return a !== false ? a + b.price : b.price; }, false) + 
        burger.toppings.reduce(function(a,b){ return a !== false ? a + b.price : b.price; }, false) + 
        burger.cheeses.reduce(function(a,b){ return a !== false ? a + b.price : b.price; }, false) + 
        burger.side.price
        ).toFixed(2);
      burger.quantity = 1;
      console.log(burger);
      $scope.order.burgers.push(burger);
      
      // set this for creating new row.
      $scope.currentBurgerIndex = $scope.order.burgers.length - 1;
      displayBurger(burger, $('#order_table'), true);
      
      // empty out the form model
      $scope.burger.empty();
    };


}]);
