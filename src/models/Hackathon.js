const { Schema, model } = require('mongoose');

const HackathonSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		identifier: {
			type: String,
			required: true
		},
		mentorLink: {
			type: String,
			required: true
		},
		participantLink: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
);

module.exports = model('Hackathon', HackathonSchema);
