const { Schema, model } = require('mongoose');

const TrackSchema = new Schema(
	{
		stage: {
			type: String,
			required: true
		},
		status: {
			type: String,
			required: true
		},
		comment: {
			type: String
		},
		team: {
			type: Schema.Types.ObjectId,
			ref: 'Team',
			required: true
		}
	},
	{ timestamps: true }
);

module.exports = model('Track', TrackSchema);
