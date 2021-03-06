var router = require('express').Router();
const passport = require('passport');
var express = require('express');
var router = express.Router();
// The root route renders our only view
router.get('/', function(req, res) {
  // Where do you want to go for the root route
  res.redirect('/index')
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/routes', // where do you want the client to go after you login 
    failureRedirect : '/index' // where do you want the client to go if login fails
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


router.get('/index', function(req, res, next) {
  res.render('index', { title: "" });
});

module.exports = router;