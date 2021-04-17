const mongoose = require('mongoose');

const Orders = mongoose.Schema(
	{
		// unique id for each order, which is auto incremeted to keep track of total orders over some duration
		CustomerName: {
			type: String,
			required: true,
		},
		Order: {
			type: Array,
			required: true,
		},
		createdDate: {
			type: Date,
			required: true,
			default: Date.now,
		},
	},
	{ versionKey: false },
);

module.exports = mongoose.model('Orders', Orders);
