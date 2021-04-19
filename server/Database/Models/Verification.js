const mongoose = require('mongoose');

const Verification = mongoose.Schema(
	{
		Email: {
			type: String,
			required: true,
		},
		Code: {
			type: String,
			required: true,
		},
	},
	{ versionKey: false },
);

module.exports = mongoose.model('Verification', Verification);
