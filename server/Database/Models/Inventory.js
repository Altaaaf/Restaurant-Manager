const mongoose = require('mongoose');

const Inventory = mongoose.Schema(
	{
		Name: {
			type: String,
			required: true,
		},
		Quantity: {
			type: String,
			required: false,
		},
		Cost: {
			type: Number,
			required: false,
		},
		ReceivedDate: {
			type: Date,
			required: false,
			default: Date.now,
		},
		ItemExpirationDate: {
			type: Date,
			required: false,
		},
		Refrigerate: {
			type: Boolean,
			required: false,
		},
	},
	{ versionKey: false },
);

module.exports = mongoose.model('Inventory', Inventory);
