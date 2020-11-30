const Route = require('../models/route');

module.exports = {
    create,
    update,
    delete: deleteOne
}

function create(req, res){
    Route.findById(req.params.id, function(err, routes){
        req.body.userId = req.user._id;
        routes.comment.push(req.body);
        routes.save(function(err){
            res.redirect(`/routes/${routes._id}`);
        });
    });
}

function update(req, res) {
    Route.findOne({'comment._id': req.params.id}, function(err, routes) {
        console.log('I am firing.............')
        console.log(req.params.id, 'I am req.params.id ******************')
        console.log(routes, 'this is routes .................')
      const commentSubdoc = routes.comment.id(req.params.id);
      if (!commentSubdoc.userId.equals(req.user._id)) return res.redirect(`/routes/${routes._id}`);
      commentSubdoc.text = req.body.text;
      commentSubdoc.rating = req.body.rating;
      routes.save(function(err) {
        res.redirect(`/routes/${routes._id}`);
      });
    });
  }

  function deleteOne(req, res) {
    Route.findOne({'comment._id': req.params.id}, function(err, routes) {
      const commentSubdoc = routes.comment.id(req.params.id);
      if (!commentSubdoc.userId.equals(req.user._id)) return res.redirect(`/routess/${routes._id}`);
      commentSubdoc.remove();
      routes.save(function(err) {
        res.redirect(`/routes/${routes._id}`);
      });
    });
  }