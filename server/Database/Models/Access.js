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
		MiddleName: {
			type: String,
			required: false,
		},
		LastName: {
			type: String,
			required: false,
		},
		WorkLocation: {
			type: String,
			required: false,
		},
		AccountType: {
			type: String,
			required: false,
			default: 'Manager',
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
