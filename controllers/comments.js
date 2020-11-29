const Route = require('../models/route');

module.exports = {
    create
}

function create(req, res){
    Route.findById(req.params.id, function(err, routes){
        routes.comment.push(req.body);
        routes.save(function(err){
            res.redirect(`/routes/${routes._id}`);
        });
    });
}