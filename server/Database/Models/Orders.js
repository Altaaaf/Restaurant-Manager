const mongoose = require('mongoose');

const Orders = mongoose.Schema(
	{
		// unique id for each order, which is auto incremeted to keep track of total orders over some duration
		OrderID: {
			type: Number,
			required: true,
		},
		BillingMethod: {
			type: true,
			required: false,
		},
		Amount: {
			type: Number,
			required: true,
		},
		TimeStamp: {
			type: Date,
			required: true,
			default: Date.now,
		},
	},
	{ versionKey: false },
);

module.exports = mongoose.model('Orders', Orders);
