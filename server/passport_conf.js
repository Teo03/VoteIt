const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const GoogleUser = require('./models/GoogleUser');
const FacebookUser = require('./models/FacebookUser');
require('dotenv').config();

const User = require('./models/User');
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
        callbackURL: process.env.googlecallbackURL
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
        callbackURL: process.env.fbcallbackURL
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