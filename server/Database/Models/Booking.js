const mongoose = require('mongoose');

const Booking = mongoose.Schema(
	{
		ID: {
			type: Number,
			required: true,
		},
		booking_date: {
			type: Date,
			required: false,
		},
		booking_time: {
			type: String,
			required: false,
		},
		comment: {
			type: String,
			required: false,
		},
		members: {
			type: String,
			required: false,
		},
		area_type: {
			type: String,
			required: false,
		},
		slot_id: {
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
		email: {
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

module.exports = mongoose.model('Booking', Booking);
