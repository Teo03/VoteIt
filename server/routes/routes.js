const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const Polls = require('../models/Polls');

// LOCAL SIGNUP //
router.post('/localsignup', (req, res) => {
	const {username, password} = req.body;

	var newUser = new User({
		username: username,
		password: password
	});

	newUser.save((err, savedUser) => {
		if(err){
			res.send('User Exists');
		} else {
			res.send('success');
			console.log('new local user: ' + newUser);
		}
	});
});

// LOCAL LOGIN //
router.post('/locallogin' , (req, res) => {
	const {username, password} = req.body;

	User.findOne({ username: username })
    .then(user => {
      user.comparePassword(password, (err, isMatch) => {
        if (isMatch) {
			req.session.user = user;
			req.session.save();
			console.log('local user is: ' + req.session.user);
          	return res.send('logged');
        } else {
          	return res.send('Incorrect Password' + err);
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

// GOOGLE AUTHENTICATION //
router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback', passport.authenticate('google'), function(req, res) {
	req.session.user = req.user;
	res.redirect('https://vote-it-app.herokuapp.com/profile');
});

//FACEBOOK AUTHENTICATION //
router.get('/auth/facebook', passport.authenticate('facebook'));
 
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: 'http://localhost:3000/loginform' }), function(req, res) {
	req.session.user = req.user;
	res.redirect('https://vote-it-app.herokuapp.com/profile');
  });

router.get('/logout', (req, res) => {
	if(req.session){
		req.session.destroy();
		req.logOut();
		res.status(200).send();
	}
});

router.get('/userLogged', (req, res) => {
	if(req.session.user){
		res.send('/profile');
	} else {
		res.send('/auth');
	}
});

router.get('/info', (req, res) => {
	return res.send(req.session.user);
});


router.get('/getPollData', (req, res) => {
	Polls.find({}, function(err, data) {
		res.send(data);
	});
});

router.get('/getPoll/:id(*)', (req, res) => {
	var pollId = req.params.id;
	Polls.find({_id: pollId}, (err, poll) => {
		if(err){
			console.log(err);
			return res.send('err');
		} else {
			return res.send(poll);
		}
	});
});

router.post('/add', (req, res) => {
	const { name, options, creator } = req.body;
	console.log(name, options, creator);

	var newPoll = new Polls({
		name: name,
		options: options,
		creator: creator
	});

	newPoll.save(function(err, savedPoll) {
		if(err){
			res.send(err);
		}else {
			res.send('new poll: ' + savedPoll);
		}
	});
});

router.post('/submitVote', (req, res) => {
	const {pollId, pollOption} = req.body;
	Polls.findOne({_id: pollId}
		).update({'options.option': pollOption}, {'$inc': {
			'options.$.votes': 1,
		}}, function(err){
			if(err){
					return console.log(err);
				} else {
					return res.send('success');
				}
		});
});

module.exports = router;