const { Schema, model } = require('mongoose');

const FileSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		key: {
			type: String,
			required: true
		},
		url: {
			type: String
		},
		size: {
			type: Number
		},
		track: {
			type: Schema.Types.ObjectId,
			ref: 'Track'
		}
	},
	{ timestamps: true }
);

module.exports = model('File', FileSchema);
