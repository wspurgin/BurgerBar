'use strict';

// Requires meanio
var mean = require('meanio');

// Creates and serves mean application
mean.serve({ /*options placeholder*/}, function (app, config) {
    var port = config.https && config.https.port ? config.https.port : config.http.port;
    console.log('Mean app started on port ' + port + ' (' + process.env.NODE_ENV + ')');

    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/GUI/index.html');
    });
    app.get('/currentOrder', function (req, res) {
        res.sendFile(__dirname + '/GUI/currentOrder.html');
    });
    
    app.get('/burger2pic', function (req, res) {
        res.sendFile(__dirname + '/GUI/images/burger2.png');
    });
});

