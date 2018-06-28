const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const Polls = require('../models/Polls');

// LOCAL SIGNUP //
router.post('/localsignup', function(req, res, next) {
	console.log('registering user');
  	User.register(new User({username: req.body.username}), req.body.password, function(err) {
    if (err) {
      res.send('Try using a different username');
      return next(err);
    }

    res.send('success')

    res.redirect('/');
  });
  });
  // LOCAL LOGIN //
  router.post('/locallogin', passport.authenticate('local'), function(req, res) {
	req.session.user = req.user;
	req.session.save();
	res.send('logged');
  });

  
// GOOGLE AUTHENTICATION //
router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }, {session: true}));

router.get('/auth/google/callback', passport.authenticate('google'), function(req, res) {
	req.session.user = req.user;
	res.redirect('/profile');
});

//FACEBOOK AUTHENTICATION //
router.get('/auth/facebook', passport.authenticate('facebook'));
 
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/auth' }), function(req, res) {
	req.session.user = req.user;
	res.redirect('/profile');
  });

router.get('/logout', (req, res) => {
	if(req.session){
		req.logout();
		req.logOut();
		req.session = null;
		res.clearCookie('session.sig');
		res.clearCookie('session');
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