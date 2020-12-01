const Route = require('../models/route')
const User = require('../models/user')

module.exports = {
    new: newRoute,
    create,
    index,
    show,
    wishList
}

function newRoute(req, res){
    res.render('routes/new', {title: 'Admin Create Page'})
};

function create(req, res){
    Route.create(req.body, function(err, routes){
        console.log('why am I firing?')
        console.log(req.body, 'this is req.body')
        console.log(req.params.id, 'this is req.params.id')
        if(err){
            res.render('routes/new', {title: 'Admin Create Page'})
        }
        res.redirect('/routes')
    });
};

function index(req, res){
    Route.find({}, function(err, routes){
        res.render('routes/index', {title: 'Route Listing', routes})
    })
}

function show(req, res){
    Route.findById(req.params.id, function(err, routes){
        
        res.render('routes/show', {title: routes.name , routes});
    });
}

function wishList(req, res) {
    Route.findById(req.params.id, function(err, routes) {
      if (routes.wishList.includes(req.user._id)){
        return res.redirect('/routes')
      } else{
            routes.wishList.push(req.user._id);
            routes.save(function(err) {
            res.redirect(`/routes/${routes._id}`);
      });
    }});
  }

