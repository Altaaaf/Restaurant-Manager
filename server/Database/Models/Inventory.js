const mongoose = require('mongoose');

const Inventory = mongoose.Schema(
	{
		Name: {
			type: String,
			required: true,
		},
		Quantity: {
			type: Number,
			required: true,
		},
		TotalRequests: {
			type: Number,
			required: false,
			default: 0,
		},
		LastRequested: {
			type: Date,
			required: false,
			default: Date.now,
		},
	},
	{ versionKey: false },
);

module.exports = mongoose.model('Inventory', Inventory);
