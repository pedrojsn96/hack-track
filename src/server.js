require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const routes = require('./routes');
const mailer = require('./modules/mailer');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
	console.log('Nova conexão ', socket.id);
});

mongoose.connect(
	'mongodb+srv://hacktrack:hacktrack@cluster0-bg77n.mongodb.net/hacktrack?retryWrites=true&w=majority',
	{
		useNewUrlParser: true
	}
);

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

const mentor = 'dale';
const participant = 'dole';
const email = 'luis.barroso@ifood.com.br'

mailer.sendMail({
	to: email,      
	subject: 'Your hackathon its on',
	template: '/hackathon_create',
	context: { mentor, participant },
  }, (err) => {
	if (err)      	
	 console.log(err)
})