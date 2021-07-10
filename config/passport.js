const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//Require your User Model here!
const User = require('../models/user')
// configuring Passport!
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    // a user has logged in via OAuth!
    User.findOne({ 'googleId': profile.id }, function(err, user){
      if (err) return cb(err);
      if (user) {
        return cb(null, user);
      } else {
        var newUser = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id
        });
        newUser.save(function(err){
          if (err) return cb(err);
          return cb(null, newUser);
        })
      }
    })
  }
));
//called everytime a request comes from our server
passport.serializeUser(function(user, done) {
  done(null, user.id); //storing our id in our session
});
//this is where we find the document to attach to req.user
passport.deserializeUser(function(id, done) {
// Find your User, using your model, and then call done(err, whateverYourUserIsCalled)
  User.findById(id, function(err, user){
    done(err, user);
  });
});



