const User = require('../models/user')
const Route = require('../models/route')
const { find } = require('../models/user')


module.exports = {
    show
}



function show(req, res){
    User.findById(req.params.id, function(err, user){
        
        res.render('users/show', {title: user.name , user});
    });
}


