// server.js

// load our dependencies
var express = require('express');					// load express
var app = express();								// create the app w/ 
var port = process.env.PORT || 8080;				// set the port node runs on
var mongoose = require('mongoose');					// load mongoose for MongoDB work
var morgan = require('morgan');						// console logger
var bodyParser = require('body-parser'); 			// HTML parser
var methodOverride = require('method-override'); 	// DELETE and PUT
var passport = require('passport'); 				// Authorization library
var flash = require('connect-flash'); 				// Lets us send messages to the browser
var cookieParser = require('cookie-parser'); 		// Lets us read our tokens
var session = require('express-session'); 			// Lets us create a session token

// mongo configuration
var configDB = require('./config/database.js');		// Load an external config file
mongoose.connect(configDB.url); 					// connect to MongoDB

// app configuration
app.use(express.static(__dirname + '/public')); 				// set public files
app.use(morgan('dev')); 										// log everything to console
app.use(bodyParser.urlencoded({'extended':'true'}));			// lets us read uri requests
app.use(bodyParser.json());										// lets us receive json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));	// sets the json mimetype
app.use(methodOverride());										// lets us DELETE and PUT
app.use(cookieParser());										// lets us read cookies

// passport config
require('./config/passport.js')(passport); 			// pass passport for configuration
app.use(session({ secret: 'testsecret',				// set session secret
	resave: 'true',									// set defaults
	saveUninitialized: 'true' })); 					// set defaults
app.use(passport.initialize());						// start passport
app.use(passport.session()); 						// persist logins
app.use(flash()); 									// session messages

// routes
require('./app/routes/chore.js')(app);		// load our chore routes
require('./app/routes/auth.js')(app, passport);		// load our auth routes

// start our app
app.listen(port);
console.log('App listening on port ' + port);
