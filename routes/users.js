var express = require('express');
var router = express.Router();
const userCtrl = require('../controllers/users');

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }


router.get('/users/:id', isLoggedIn, userCtrl.show);


module.exports = router;