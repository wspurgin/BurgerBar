'use strict';
 
var menu = require('../controllers/menu');
 
module.exports = function(Menu, app, auth, database, passport) {
  
  app.get('/menu', menu.fullMenu);


  app.get('/', index.render);
    
};