const mongoose = require('mongoose');

const Menu = mongoose.Schema(
	{
		Name: {
			type: String,
			required: true,
		},
		Price: {
			type: String,
			required: false,
		},
		Ingredients: {
			type: Array,
			required: false,
		},
		LimitedTime: {
			type: Boolean,
			required: false,
		},
		Beverage: {
			type: Boolean,
			required: false,
		},
	},
	{ versionKey: false },
);

module.exports = mongoose.model('Menu', Menu);
