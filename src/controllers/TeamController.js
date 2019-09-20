const Team = require('../models/Team');
const User = require('../models/User');
const Hackathon = require('../models/Hackathon');

module.exports = {
	async store(req, res) {
		const { name, userId, hackaId } = req.body;

		const teamExists = await Team.findOne({
			name: { $eq: name }
		});

		if (teamExists) {
			return res.json({ status: 'error', msg: 'Team already exists!' });
		}

		const team = await Team.create({
			name,
			hackathon: hackaId
		});

		const user = await User.findOne({ _id: userId });
		user.team = team._id;
		await user.save();

		team.users.push(user._id);
		await team.save();

		return res.json(team);
	},

	async index(req, res) {
		let teams = [];
		const { hackaId } = req.query;

		teams = await Team.find({
			hackathon: { $eq: hackaId }
		});

		return res.json(teams);
	},

	async join(req, res) {
		const { userId, teamId } = req.body;

		const team = await Team.findOne({ _id: teamId });
		const user = await User.findOne({ _id: userId });
		user.team = team._id;
		await user.save();

		team.users.push(user._id);
		await team.save();

		return res.json(team);
	}
};
