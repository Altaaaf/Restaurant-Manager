const mongoose = require('mongoose');

const Reservation = mongoose.Schema(
	{
		// Unique Table ID, incase QR code changes
		TableID: {
			type: Number,
			required: true,
		},
		TimePeriod: {
			type: Date,
			required: true,
		},
	},
	{ versionKey: false },
);

module.exports = mongoose.model('Reservation', Reservation);
