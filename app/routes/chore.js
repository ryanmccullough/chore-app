// /app/routes/chore.js
var Chore = require('../models/chore.js');

module.exports = function(app) {

// CHORES ROUTES
app.get('/api/chores',function(req, res) {
	Chore.find(function(err, chores) {
		if (err)
			res.send(err)
		res.json(chores);
	});
});
app.post('/api/chores', function(req, res) {
	Chore.create({
		text : req.body.text
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
app.get('/api/chores*', function(req, res){
	res.sendfile('./public/index.html');
});
};

function isLoggedIn() {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}