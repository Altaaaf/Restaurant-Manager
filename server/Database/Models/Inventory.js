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
		Expense: {
			type: Number,
			required: false,
		},
		Received: {
			type: Date,
			required: false,
			default: Date.now,
		},
		Expiration: {
			type: Date,
			required: false,
		},
		Supplier: {
			type: String,
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
