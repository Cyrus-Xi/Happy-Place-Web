// Modules.
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose       = require('mongoose');

var passport       = require('passport');
var flash          = require('connect-flash');
var morgan         = require('morgan');
var cookieParser   = require('cookie-parser');
var session        = require('express-session');

// Configuration.
var db = require('./config/db');
mongoose.connect(db.url); 

var port = process.env.PORT || 8080; 

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
//app.use(bodyParser()); // get information from html forms (but deprecated
//must call individually as below)

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Configure body parser.
app.use(bodyParser.json()); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(methodOverride('X-HTTP-Method-Override')); 

// Set the static files location: /public/img will be /img for users.
app.use(express.static(__dirname + '/public')); 

// Routes.

// API routes.
var api = require('./app/routing/api_routes');
app.use('/api', api);

// Main routes.
require('./app/routing/main_routes')(app, passport);

// Start app at http://localhost:8080.
app.listen(port);               

console.log('Magic happens on port ' + port);

// Expose app.
exports = module.exports = app;
