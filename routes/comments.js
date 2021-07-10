const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }

router.post('/routes/:id/comments', isLoggedIn, commentsCtrl.create);

router.put('/comments/:id', isLoggedIn, commentsCtrl.update)

router.delete('/comments/:id', isLoggedIn, commentsCtrl.delete)


module.exports = router;