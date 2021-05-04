const mongoose = require('mongoose');

const Account = mongoose.Schema(
	{
		Username: {
			type: String,
			required: true,
		},
		Password: {
			type: String,
			required: true,
		},
		Email: {
			type: String,
			required: false,
		},
		PhoneNumber: {
			type: String,
			required: false,
		},
		FirstName: {
			type: String,
			required: false,
		},
		LastName: {
			type: String,
			required: false,
		},
		AccountType: {
			type: String,
			required: false,
			default: 'Customer',
		},
		Salary: {
			type: Number,
			required: false,
			default: 20,
		},
		EmailVerified: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	{ versionKey: false },
);

module.exports = mongoose.model('Account', Account);
