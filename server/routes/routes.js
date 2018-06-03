const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const auth = require('../auth/passport.js');

router.post('/localsignup', (req, res) => {
	const {username, password} = req.body;
	
	var newUser = new User({
		username: username
	});

	User.register(newUser, password, function (err) {
		if (err) {
			if (err.name == 'UserExistsError') {
				res.send('User with that username already exists');
			} else if(err.name == 'MissingPasswordError'){
				res.send('Please enter a password');
			} else if(err.name == 'MissingUsernameError'){
				res.send('Please enter a username');
			}
			else {
				res.send('error while registering!', err);
			}
		} else {
			res.send('registered');
		}
	});
});

module.exports = router;