const { Router } = require('express');
const matchController = require('./src/controllers/matchController')
const RankController = require('./src/controllers/rankController');

const routes = Router();

routes.get('', matchController.index);

routes.get('/rank', RankController.index)

module.exports = routes;