const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD
	}
});

const handlebarOptions = {
	viewEngine: {
		partialsDir: path.resolve('./src/resources/mail/'),
		layoutsDir: path.resolve('./src/resources/mail/')
	},
	viewPath: path.resolve('./src/resources/mail/')
};

transporter.use('compile', hbs(handlebarOptions));

module.exports = transporter;
