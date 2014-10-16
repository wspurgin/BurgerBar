'use strict';
 
var menus = require('../controllers/menu');
 
module.exports = function(Menu, app, auth, database, passport) {
  
  app.get('/menu', menus.fullMenu);
    
};