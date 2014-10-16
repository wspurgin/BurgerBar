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
  Bun = mongoose.model('Bun');
  // async = require('async'),
  // config = require('meanio').loadConfig();
  
/**
 * Get Full menu
 */
exports.fullMenu = function(req, res) {
  var menu = {};

  Meat.find()
  .exec(function(err, meats){
    if (err) res.send(err);
    else menu.meats = meats;
  });

  Side.find()
  .exec(function(err, side){
    if (err) res.send(err);
    else menu.side = side;
  });

  Sauce.find()
  .exec(function(err, sauce){
    if (err) res.send(err);
    else menu.side = sauce;
  });

  Topping.find()
  .exec(function(err, topping){
    if (err) res.send(err);
    else menu.topping = topping;
  });

  Cheese.find()
  .exec(function(err, cheese){
    if (err) res.send(err);
    else menu.cheese = cheese;
  });

  Bun.find()
  .exec(function(err, bun){
    if (err) res.send(err);
    else menu.bun = bun;
  });

  // Other menu items here
  res.status(200).json(menu);
};