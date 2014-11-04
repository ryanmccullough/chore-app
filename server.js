// server.js

// dependencies
var express = require('express');	// load express
var app = express();	// create the app w/ express
var mongoose = require('mongoose');	// load mongoose
var morgan = require('morgan');	// console logger
var bodyParser = require('body-parser'); // HTML parser
var methodOverride = require('method-override'); // DELETE and PUT

// configuration
mongoose.connect('mongodb://localhost:27017'); // connect to MongoDB
	// mongo config
var db = mongoose.connection;
console.log("Attempting to connect to MongoDB...");
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log("MongoDB connected successfully");  
});
app.use(express.static(__dirname + '/public')); // set public files
app.use(morgan('dev')); // log everything to console
app.use(bodyParser.urlencoded({'extended':'true'})); 
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

// models
console.log("Loading Models...");
var Chore = mongoose.model('Chore', {
	text : String
});

// routes
console.log("Loading Routes...")
app.get('/api/chores',function(req, res) {
	Chore.find(function(err, chores) {
		if (err)
			res.send(err)
		res.json(chores);
	});
});
app.post('/api/chores', function(req, res) {
	Chore.create({
		text : req.body.text,
		done : false
	}, function(err, chore) {
		if (err)
			res.send(err);
		Chore.find(function(err, chores) {
			if (err)
				res.send(err)
			res.json(chores);
		});
	});
});
app.delete('/api/chores/:chore_id', function(req, res) {
	Chore.remove({
		_id : req.params.chore_id
	}, function(err, chore) {
		if (err)
			res.send(err);
		Chore.find(function(err, chores) {
			if (err)
				res.send(err)
			res.json(chores);
		});
	});
});

// angular call
console.log("Handing off to AngularJS...");
app.get('*', function(req, res){
	res.sendfile('./public/index.html');
});

// listen
app.listen(8080);
console.log("App listening on port 8080");
