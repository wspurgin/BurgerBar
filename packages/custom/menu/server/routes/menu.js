'use strict';
 
var menu = require('../controllers/menu');
 
module.exports = function (app) {
  app.post('/menu', bucketList.menu);
};