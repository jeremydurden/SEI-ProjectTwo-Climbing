var express = require('express');
var router = express.Router();
const routesCtrl = require('../controllers/routes');
// GET /flights/new
router.get('/routes/new', routesCtrl.new);

router.post('/routes', routesCtrl.create);

router.get('/routes', routesCtrl.index);

router.get('/routes/:id', routesCtrl.show);

module.exports = router;