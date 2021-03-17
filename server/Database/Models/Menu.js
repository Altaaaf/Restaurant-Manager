const mongoose = require('mongoose');

const Menu = mongoose.Schema(
	{
		Name: {
			type: String,
			required: true,
		},
		Price: {
			type: Number,
			required: true,
		},
		Type: {
			type: String,
			required: true,
		},
		Description: {
			type: String,
			required: false,
		},
	},
	{ versionKey: false },
);

module.exports = mongoose.model('Menu', Menu);
