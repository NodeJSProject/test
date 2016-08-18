var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.js');

module.exports = function(passport) {

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
            done(err, user);
        });
	});
	// setup default field
	passport.use('login-local', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	},
	function(req, email, password, done) {
		console.log(email, password)
		User.findOne({ 'email' :  email }, '_id username email password roles', function(err, user) {
			console.log(user)
			if (err){ return done(err); }
			if(!user){
				return done(null, false, { status: false, message: 'Oops! Wrong email.' });	
			}
			if (!user.validPassword(password)){
				return done(null, false, { status: false, message: 'Oops! Wrong password.' });
			}
			return done(null, userObj(user));
		});

	}));

	//output data user json
	var userObj = function(user){
		return {
			id: user._id,
			username: user.username,
			roles: user.roles
		};
	};

	return {
		loginLocal: function(req, res, next) {
			console.log(req.body)
			passport.authenticate('login-local', function(err, user, info) {
				console.log(user, info)
				if (err) { return next(err); } 
				if (!user) {
					res.sendStatus(401); //unauthorized
				}
				else{
					req.logIn(user, function(err) {
						if (err) { return next(err); }
						res.json({ self: user });
					});
				}
			})(req, res, next);
		},
		isLoggedIn: function(req, res, next){
			console.log(req.isAuthenticated())
			if (req.isAuthenticated()){
				res.json(req.user);
				//next();
			}
			else{
				res.sendStatus(401); //unauthorized
			}
		},
		logOut: function(req, res){
			req.logout();
			res.sendStatus(200);
		}

	}
}