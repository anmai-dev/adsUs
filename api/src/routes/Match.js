const route = require('express').Router();
const matchControllers = require('../controllers/matchControllers');
const middlewareControllers = require('../controllers/middlewareControllers');

// Add match route (admin only)
route.post('/create', middlewareControllers.verifyTokenAdmin, matchControllers.creatMatch);

// Get all matches (public access - no authentication required)
route.get('/', matchControllers.getAllMatch);

// Delete match (admin only)
route.delete('/:id', middlewareControllers.verifyTokenAdmin, matchControllers.deleteMatch);

module.exports = route;