'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Side = mongoose.model('Side'),
  Sauce = mongoose.model('Sauce'),
  Topping = mongoose.model('Topping'),
  Cheese = mongoose.model('Cheese'),
  Bun = mongoose.model('Bun'),
  Meat = mongoose.model('Meat'),
  async = require('async'),
  config = require('meanio').loadConfig();

/**
 * Get Full menu
 */
exports.fullMenu = function(req, res) {
  var menu = {
    meats: Meat.find()
    // Other menu items here
  };
  res.json(menu);
};
