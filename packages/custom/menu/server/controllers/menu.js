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
  async = require('async'),
  config = require('meanio').loadConfig();
  
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