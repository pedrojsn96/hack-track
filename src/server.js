const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();
const server = require('http').Server(app);

mongoose.connect(
	'mongodb+srv://hacktrack:hacktrack@cluster0-bg77n.mongodb.net/hacktrack?retryWrites=true&w=majority',
	{
		useNewUrlParser: true
	}
);

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(process.env.PORT || '8080', () => {
	console.log('This application is running !!!!');
});
