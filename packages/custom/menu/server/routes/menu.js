'use strict';
 
var menu = require('../controllers/menu');
 
module.exports = function(Menu, app, auth, database, passport) {
  
  app.route('/menu')
    .get(menu.fullMenu);
    
};