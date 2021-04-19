const nodemailer = require('nodemailer');
const contactEmail = nodemailer.createTransport({
	service: 'hotmail',
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASSWORD,
	},
	tls: {
		// do not fail on invalid certs
		rejectUnauthorized: false,
	},
});

const verify = () => {
	contactEmail.verify((error) => {
		if (error) {
			console.log(error);
		} else {
			console.log('Ready to Send');
		}
	});
};

module.exports = { verify, contactEmail };
