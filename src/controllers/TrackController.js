const Team = require('../models/Team');
const Track = require('../models/Track');

module.exports = {
	async store(req, res) {
		const { stage, status, comment, teamId } = req.body;

		const track = await Track.create({
			stage,
			status,
			comment,
			team: teamId
		});

		const team = await Team.findOne({ _id: teamId });

		team.tracks.push(track._id);
		await team.save();

		return res.json(track);
	},

	async index(req, res) {
		const { teamId } = req.query;

		const tracks = await Track.find({ team: { $eq: teamId } });

		// const tracks = team.tracks;

		return res.json(tracks);
	}
};
