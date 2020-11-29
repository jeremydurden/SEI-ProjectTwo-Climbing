const Route = require('../models/route')

module.exports = {
    new: newRoute,
    create,
    index,
    show
}

function newRoute(req, res){
    res.render('routes/new', {title: 'Admin Create Page'})
};

function create(req, res){
    Route.create(req.body, function(err, routes){
        if(err){
            res.render('routes/new', {title: 'Admin Create Page'})
        }
        res.redirect('/routes')
    });
};

function index(req, res){
    //use our model to get everything from the DB
    Route.find({}, function(err, routes){
        res.render('routes/index', {title: 'Route Listing', routes})
    })
}

function show(req, res){
    Route.findById(req.params.id, function(err, routes){
        
        res.render('routes/show', {title: routes.name , routes});
    });
}

