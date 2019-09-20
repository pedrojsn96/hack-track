const express = require('express');
const HackathonController = require('./controllers/HackathonController');
const UserController = require('./controllers/UserController');
const TeamController = require('./controllers/TeamController');

const routes = express.Router();

routes.post('/hackathons', HackathonController.store);
routes.get('/hackathons/validate', HackathonController.validateCode);
routes.post('/users', UserController.store);
routes.post('/teams', TeamController.store);
routes.post('/teams/join', TeamController.join);
routes.get('/teams', TeamController.index);

module.exports = routes;
