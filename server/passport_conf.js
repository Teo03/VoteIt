const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleUser = require('./models/GoogleUser');
const FacebookUser = require('./models/FacebookUser');
require('dotenv').config();

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    GoogleUser.findById(id).then((user) => {
        done(null, user);
    });
    FacebookUser.findById(id).then((user) => {
        done(null, user);
    });
});

// GOOGLE STRATEGY //

passport.use(
    new GoogleStrategy({
        clientID: process.env.googleclientID,
        clientSecret: process.env.googleclientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        GoogleUser.findOne({
            googleId: profile.id
        }).then((currentUser) => {
            if (currentUser) {
                console.log('google user is: ', currentUser);
                done(null, currentUser);
            } else {
                new GoogleUser({
                    googleId: profile.id,
                    username: profile.displayName
                }).save().then((newUser) => {
                    console.log('created new google user: ', newUser);
                    done(null, newUser);
                });
            }
        });
    })
);

// FACEBOOK STRATEGY //

passport.use(new FacebookStrategy({
        clientID: process.env.fbAppID,
        clientSecret: process.env.fbAppSecret,
        callbackURL: '/auth/facebook/callback'
    },
    function (accessToken, refreshToken, profile, done) {
        FacebookUser.findOne({
            facebookId: profile.id
        }).then((currentUser) => {
            if (currentUser) {
                console.log('facebook user is: ', currentUser);
                done(null, currentUser);
            } else {
                new FacebookUser({
                    facebookId: profile.id,
                    username: profile.displayName
                }).save().then((newUser) => {
                    console.log('created new facebook user: ', newUser);
                    done(null, newUser);
                });
            }
        });
    }
));