const mongoose = require('mongoose');

const Reservation = mongoose.Schema(
	{
		ReservationTime: {
			type: String,
			required: false,
		},
		coverNo: {
			type: Number,
			required: false,
		},
		phone: {
			type: String,
			required: false,
		},
		FirstName: {
			type: String,
			required: false,
		},
		lastName: {
			type: String,
			required: true,
		},
	},
	{ versionKey: false },
);

module.exports = mongoose.model('Reservation', Reservation);
