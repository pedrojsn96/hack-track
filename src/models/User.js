const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		role: {
			type: String,
			required: true
		},
		bio: {
			type: String
		},
		isMentor: {
			type: Boolean,
			required: true
		},
		hackathon: {
			type: Schema.Types.ObjectId,
			ref: 'Hackathon',
			required: true
		}
	},
	{ timestamps: true }
);

module.exports = model('User', UserSchema);
