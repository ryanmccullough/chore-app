// routes

module.exports = function(app, passport) {
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
};

function isLoggedIn() {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}