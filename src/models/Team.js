const { Schema, model } = require('mongoose');

const TeamSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
);

module.exports = model('Team', TeamSchema);
