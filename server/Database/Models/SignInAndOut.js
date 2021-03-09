const mongoose = require('mongoose');

const EmployeeSignInAndOut = mongoose.Schema(
	{
		// Unique UserID from employee
		EmployeeID: {
			type: Number,
			required: true,
		},
		Started: {
			type: Date,
			required: true,
		},
		Ended: {
			type: Date,
			required: false,
		},
	},
	{ versionKey: false },
);

module.exports = mongoose.model('EmployeeSignInAndOut', EmployeeSignInAndOut);
