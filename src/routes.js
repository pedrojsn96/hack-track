const express = require('express');
const HackathonController = require('./controllers/HackathonController');

const routes = express.Router();

routes.post('/hackathons', HackathonController.store);

module.exports = routes;
