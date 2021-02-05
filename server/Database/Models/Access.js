const mongoose = require('mongoose');

const LoginSchema = mongoose.Schema(
	{
		Username: {
			type: String,
			required: true,
		},
		Password: {
			type: String,
			required: true,
		},
		CaptchaToken: {
			type: String,
			required: true,
		},
	},
	{ versionKey: false },
);
const RegisterSchema = mongoose.Schema(
	{
		Username: {
			type: String,
			required: true,
		},
		Email: {
			type: String,
			required: true,
		},
		Password: {
			type: String,
			required: true,
		},
		CaptchaToken: {
			type: String,
			required: true,
		},
	},
	{ versionKey: false },
);

module.exports = mongoose.model('Login', LoginSchema);
module.exports = mongoose.model('Register', RegisterSchema);
