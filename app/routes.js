// routes

module.exports = function(app, passport, Chore) {

// USER ROUTES
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/api/user', function(req, res) {
        res.sendfile('./public/user.html'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/user/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

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
app.get('/api/chores*', function(req, res){
	res.sendfile('./public/index.html');
});
};

function isLoggedIn() {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}