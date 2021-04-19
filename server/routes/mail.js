const express = require('express');
const router = express.Router();
const Mail = require('../Helpers/Mail');
require('dotenv/config');

router.post('/contact', (req, res) => {
	const name = req.body.name;
	const email = req.body.email;
	const subject = req.body.subject;
	const message = req.body.message;

	const mail = {
		from: process.env.EMAIL,
		to: name,
		subject: 'Contact Form Submission',
		html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Subject: ${subject}</p>
             <p>Message: ${message}</p>`,
	};
	Mail.contactEmail.sendMail(mail, (error) => {
		if (error) {
			res.json({ status: 'ERROR' });
		} else {
			res.json({ status: 'Message Sent' });
		}
	});
});
module.exports = router;
