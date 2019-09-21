const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const HackathonController = require('./controllers/HackathonController');
const UserController = require('./controllers/UserController');
const TeamController = require('./controllers/TeamController');
const TrackController = require('./controllers/TrackController');
const FileController = require('./controllers/FileController');

const routes = express.Router();

routes.get('/hackathons', HackathonController.get);
routes.post('/hackathons', HackathonController.store);
routes.get('/hackathons/validate', HackathonController.validateCode);
routes.post('/users', UserController.store);
routes.post('/teams', TeamController.store);
routes.post('/teams/join', TeamController.join);
routes.get('/teams', TeamController.index);
routes.post('/tracks', TrackController.store);
routes.get('/tracks', TrackController.index);
routes.post(
	'/files/upload',
	multer(multerConfig).single('file'),
	FileController.store
);

module.exports = routes;
