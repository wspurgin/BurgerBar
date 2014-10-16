'use strict';
 
var menu = require('../controllers/menu');
 
module.exports = function(app) {
  
  app.get('/menu', menu.fullMenu);
    
};