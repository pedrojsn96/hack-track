require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const routes = require('./routes');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
	console.log('Nova conexão ', socket.id);
});

mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true
});

app.use((req, res, next) => {
	req.io = io;
	return next();
});
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(routes);

server.listen(process.env.PORT || '8080', () => {
	console.log('This application is running !!!!');
});
