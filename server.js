const express = require('express');
const app = express();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

process.env.PORT = 80;
var port = process.env.PORT || 5000;



// MODELS
var Beacon = require('./app/models/beacon');


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// on routes that end in /bears
// ----------------------------------------------------
router.route('/beacons')

// create a bear (accessed at POST http://localhost:80/api/beacons)
    .post(function(req, res) {

    var beacon = new Beacon();      // create a new instance of the Beacon model
    beacon.id = req.body.id;  // set the beacons id (comes from the request)

    // save the beacon and check for errors
    beacon.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Beacon created!' });
    });

    // get all the beacons (accessed at GET http://localhost:8080/api/beacons)
    .get(function(req, res) {
        Beacon.find(function(err, beacons) {
            if (err)
                res.send(err);

            res.json(beacons);
        });
    });

});


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);






var mongoose   = require('mongoose');
//mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); // connect to our database



// START THE SERVER
// =============================================================================
server.listen(port);
console.log("webserver started on port: "+port);