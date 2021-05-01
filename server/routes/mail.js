const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const contactEmail = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'Barnslink@gmail.com',
		pass: 'Nyit2021',
	},
});
contactEmail.verify((error) => {
	if (error) {
		console.log(error);
	} else {
		console.log('Ready to Send');
	}
});

router.post('/contact', (req, res) => {
	const name = req.body.name;
	const email = req.body.email;
	const subject = req.body.subject;
	const message = req.body.message;

	const mail = {
		from: name,
		to: 'Barnslink@gmail.com',
		subject: 'Contact Form Submission',
		html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Subject: ${subject}</p>
             <p>Message: ${message}</p>`,
	};
	contactEmail.sendMail(mail, (error) => {
		if (error) {
			return res.status(400).json({ status: 'ERROR' });
		} else {
			return res.status(200).json({ status: 'Message Sent' });
		}
	});
});
module.exports = router;
