const mongoose = require('mongoose');

const Table = mongoose.Schema(
	{
		// Unique Table ID, incase QR code changes
		TableID: {
			type: Number,
			required: true,
		},
		QRCode: {
			type: String,
			required: true,
		},
		AvailableSeats: {
			type: Number,
			required: true,
		},
		Reserved: {
			type: Boolean,
			required: false,
		},
	},
	{ versionKey: false },
);

module.exports = mongoose.model('Table', Table);
