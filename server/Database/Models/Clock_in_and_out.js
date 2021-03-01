const mongoose = require('mongoose');

const ClockIn = mongoose.Schema(
	{
		// Unique UserID from
		USERID: {
			type: Number,
			required: true,
		},
		Started: {
			type: Date,
			required: true,
		},
		Ended: {
			type: Date,
			required: true,
		},
		HoursWorked: {
			type: Number,
			required: true,
		},
	},
	{ versionKey: false },
);

module.exports = mongoose.model('ClockIn', ClockIn);
