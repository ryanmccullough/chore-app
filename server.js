// server.js

// dependencies
var express = require('express');	// load express
var app = express();	// create the app w/ 
var port = process.env.PORT || 8080;	// set the port node runs on
var mongoose = require('mongoose');	// load mongoose for MongoDB work
var morgan = require('morgan');	// console logger
var bodyParser = require('body-parser'); // HTML parser
var methodOverride = require('method-override'); // DELETE and PUT
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');

// mongo configuration
var configDB = require('./config/database.js');
mongoose.connect(configDB.url); // connect to MongoDB

require('./config/passport.js')(passport); // pass passport for configuration

// app configuration
app.use(express.static(__dirname + '/public')); // set public files
app.use(morgan('dev')); // log everything to console
app.use(bodyParser.urlencoded({'extended':'true'})); 
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use(cookieParser());

// passport config
app.use(session({ secret: 'testsecret',
	resave: 'true',
	saveUninitialized: 'true' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persist logins
app.use(flash()); // session messages

// routes
require('./app/routes/chore')(app);
require('./app/routes/auth')(app);

// listen
app.listen(port);
console.log('App listening on port ' + port);
