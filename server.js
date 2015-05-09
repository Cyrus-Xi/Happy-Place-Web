// Modules.
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose       = require('mongoose');

// Configuration.
var db = require('./config/db');
mongoose.connect(db.url); 

var port = process.env.PORT || 8080; 

var Compliment = require('./app/models/compliment');

// Configure body parser.
app.use(bodyParser.json()); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(methodOverride('X-HTTP-Method-Override')); 

// Set the static files location: /public/img will be /img for users.
app.use(express.static(__dirname + '/public')); 

// Routes.
var api = require('./app/routes');
app.use('/api', api);

// Start app at http://localhost:8080.
app.listen(port);               

console.log('Magic happens on port ' + port);

// Expose app.
exports = module.exports = app;
