const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
var logged = false;

router.post('/localsignup', function(req, res) {
	const {username, password} = req.body;

	var newUser = new User({
		username: username,
		password: password
	});

	newUser.save(function(err, savedUser) {
		if(err){
			res.send('User Exists');
		} else {
			res.send('success');
		}
	});
});

router.post('/locallogin' , function(req, res) {
	const {username, password} = req.body;

	User.findOne({ username: username })
    .then(user => {
      user.comparePassword(password, (err, isMatch) => {
        if (isMatch) {
			req.session.user = user;
			req.session.save();
			logged = true;
          	return res.send('logged');
        } else {
			logged = false;
			console.log(err);
          	return res.send('Incorrect Password');
        }
      });
    })
    .catch(err => {
      if(err == "TypeError: Cannot read property 'comparePassword' of null"){
				return res.send('Invalid User');
			} else if(err){
				return res.send(err);
			}
    });                         
});

router.get('/logout', function(req, res){
	if(req.session){
		req.session.destroy();
		res.status(200).send();
	}
	logged = false;
})

router.get('/profile', function(req, res){
	res.json(req.session.user);
});

module.exports = router;