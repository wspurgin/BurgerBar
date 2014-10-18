'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Order = new Module('order');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Order.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Order.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Order.menus.add({
    title: 'order example page',
    link: 'order example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Order.aggregateAsset('css', 'order.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Order.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Order.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Order.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Order;
});
