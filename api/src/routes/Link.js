const route = require('express').Router();
const linkControllers = require('../controllers/linkControllers');

route.post('/create', linkControllers.createLink);
route.get('/:id', linkControllers.getLink);
route.get('/', linkControllers.getAllLink);




module.exports = route;
