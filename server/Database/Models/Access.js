const mongoose = require('mongoose');

const Account = mongoose.Schema(
	{
		// Unique ID assigned to each employee
		EmployeeID: {
			type: Number,
			required: false,
		},
		// API key is auto generated, which will be passed as a header when sending requests from frontend to backend
		APIKey: {
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
