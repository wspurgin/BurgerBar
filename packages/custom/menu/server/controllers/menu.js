'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Meat = mongoose.model('Meat'),
  Side = mongoose.model('Side'),
  Sauce = mongoose.model('Sauce'),
  Topping = mongoose.model('Topping'),
  Cheese = mongoose.model('Cheese'),
  Bun = mongoose.model('Bun'),
  fs = require('fs'),
  path = require('path');

  // async = require('async'),
  // config = require('meanio').loadConfig();
  
/**
 * Get Full menu
 */
exports.fullMenu = function(req, res) {
  var menu = {};
  function callback (itemName, item) {
    menu[itemName] = item;
    if (Object.keys(menu).length === 6) {
      return res.json(menu);
    }
  }

  Meat.find({},function(err, meats){
    if (err) res.send(err);
    else callback('meats', meats);
  });

  Side.find()
  .exec(function(err, sides){
    if (err) res.send(err);
    else callback('sides', sides);
  });

  Sauce.find(function(err, sauces){
    if (err) res.send(err);
    else callback('sauces', sauces);
  });

  Topping.find()
  .exec(function(err, topping){
    if (err) res.send(err);
    else callback('topping', topping);
  });

  Cheese.find()
  .exec(function(err, cheeses){
    if (err) res.send(err);
    else callback('cheeses', cheeses);
  });

  Bun.find({}, function(err, buns) {
    if (err) res.send(err);
    else callback('buns', buns);
  });
};


/**
* Function to populate the sub-menus
*/
exports.populate = function(req, res) {

  // Clear the pre-existing databases
  Meat.remove({}, function(err) {if (err) res.send(err);});
  Side.remove({}, function(err) {if (err) res.send(err);});
    Sauce.remove({}, function(err) {if (err) res.send(err);});
    Topping.remove({}, function(err) {if (err) res.send(err);});
    Cheese.remove({}, function(err) {if (err) res.send(err);});
    Bun.remove({}, function(err) {if (err) res.send(err);});


    // Parse json file 
  fs.readFile(path.join(__dirname, '../../menu.json'),
    function(fileErr, data) {
      if (fileErr) console.log(fileErr);
      var json = JSON.parse(data.toString());
      
      // set json to the actual root javascript menu object
      json = json.menu;

      // Populate Meat menu 
      var i;
      for (i = 0; i < json.meats.length; i+=1)
      {
        var meat = new Meat();
        meat.name = json.meats[i].name;
        meat.price = json.meats[i].price;
        meat.save();
      }

      // Populate Side menu
      for (i = 0; i < json.sides.length; i+=1)
      {
        var side = new Side();
        side.name = json.sides[i].name;
        side.price = json.sides[i].price;
        side.save();
      }

      // Populate Sauce menu
      for (i = 0; i < json.sauces.length; i+=1)
      {
        var sauce = new Sauce();
        sauce.name = json.sauces[i].name;
        sauce.price = json.sauces[i].price;
        sauce.save();
      }

      // Populate Topping menu
      for (i = 0; i < json.toppings.length; i+=1)
      {
        var topping = new Topping();
        topping.name = json.toppings[i].name;
        topping.price = json.toppings[i].price;
        topping.save();
      }

      // Populate Cheese menu
      for (i = 0; i < json.cheeses.length; i+=1)
      {
        var cheese = new Cheese();
        cheese.name = json.cheeses[i].name;
        cheese.price = json.cheeses[i].price;
        cheese.save();
      }

      // Populate Bun menu
      for (i = 0; i < json.buns.length; i+=1)
      {
        var bun = new Bun();
        bun.name = json.buns[i].name;
        bun.price = json.buns[i].price;
        bun.save();
      }
      return res.status(201).send();
  });
};

