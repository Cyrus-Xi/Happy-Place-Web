// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose       = require('mongoose');

// configuration ===========================================
    
// config files
var db = require('./config/db');

// connect to our mongoDB database 
mongoose.connect(db.url); 

// set our port
var port = process.env.PORT || 8080; 

var Compliment = require('./app/models/compliment');

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 

// routes ==================================================
//require('./app/routes')(app); // configure our routes

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'YAY THIS WORKS SOMEHOW' });	
});

// on routes that end in /compliments
// ----------------------------------------------------
router.route('/compliments')

	// create a compliment (accessed at POST http://localhost:8080/compliments)
	.post(function(req, res) {
		
		var compliment = new Compliment();		// create a new instance of the Compliment model
		compliment.author = req.body.author;  // set the author (comes from the request)
        compliment.body = req.body.body;
        compliment.date = req.body.date;

		compliment.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Compliment created!' });
		});

		
	})

	// get all the compliments (accessed at GET
    // http://localhost:8080/api/compliments)
	.get(function(req, res) {
		Compliment.find(function(err, compliments) {
			if (err)
				res.send(err);

			res.json(compliments);
		});
	});

// on routes that end in /compliments/:compliment_id
// ----------------------------------------------------
router.route('/compliments/:compliment_id')

	// get the compliment with that id
	.get(function(req, res) {
		Compliment.findById(req.params.compliment_id, function(err, compliment) {
			if (err)
				res.send(err);
			res.json(compliment);
		});
	})

	// update the compliment with this id
	.put(function(req, res) {
		Compliment.findById(req.params.compliment_id, function(err, compliment) {

			if (err)
				res.send(err);

			compliment.author = req.body.author;
            compliment.body = req.body.body;
            compliment.date = req.body.date;
			compliment.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Compliment updated!' });
			});

		});
	})

	// delete the compliment with this id
	.delete(function(req, res) {
		Compliment.remove({
			_id: req.params.compliment_id
		}, function(err, compliment) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);               

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;
