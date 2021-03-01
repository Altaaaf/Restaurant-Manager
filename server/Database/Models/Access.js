const mongoose = require('mongoose');

const Account = mongoose.Schema(
	{
		// Unique user id to identify every account
		USERID: {
			type: Number,
			required: false,
		},
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
		WorkLocation: {
			type: String,
			required: false,
		},
		AccountType: {
			type: String,
			required: true,
		},
		LastLoginLocation: {
			type: String,
			required: true,
		},
		Salary: {
			type: Number,
			required: false,
			default: 20,
		},
	},
	{ versionKey: false },
);

module.exports = mongoose.model('Account', Account);
