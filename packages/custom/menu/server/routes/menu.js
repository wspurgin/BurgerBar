'use strict';
 
var menus = require('../controllers/menu');
 
module.exports = function(Menu, app, auth, database, passport) {
  
  app.route('/menu')
    .get(menus.fullMenu);
};