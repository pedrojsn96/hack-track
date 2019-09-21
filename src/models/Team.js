const { Schema, model } = require('mongoose');

const TeamSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		hackathon: {
			type: Schema.Types.ObjectId,
			ref: 'Hackathon',
			required: true
		},
		users: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User'
			}
		],
		tracks: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Track'
			}
		]
	},
	{ timestamps: true }
);

module.exports = model('Team', TeamSchema);
