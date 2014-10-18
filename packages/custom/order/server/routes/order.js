'use strict';

// The Package is past automatically as first parameter
module.exports = function(Order, app, auth, database) {

  app.get('/order/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/order/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/order/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/order/example/render', function(req, res, next) {
    Order.render('index', {
      package: 'order'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
