const mongoose = require('mongoose');

const Reservation = mongoose.Schema(
	{
		FirstName: {
			type: String,
			required: false,
		},
		LastName: {
			type: String,
			required: false,
		},
		PhoneNumber: {
			type: String,
			required: false,
		},
		// change to date eventually ( will require parsing / validation from front end!)
		ReservationTime: {
			type: String,
			required: false,
		},
		People: {
			type: Number,
			required: true,
		},
	},
	{ versionKey: false },
);

module.exports = mongoose.model('Reservation', Reservation);
