const R = require('rambda');
const Hackathon = require('../models/Hackathon');

module.exports = {
	async store(req, res) {
		const { name, identifier } = req.body;

		const hackaExists = await Hackathon.findOne({ identifier: identifier });

		if (hackaExists) {
			return res.json({ status: 'error', msg: 'Hackathon already exists!' });
		}

		const number = new Date().getTime() % 1000;

		const hackathon = await Hackathon.create({
			name,
			identifier,
			mentorLink: `${identifier.toLowerCase()}-mentor-hacktrack-${number}`,
			participantLink: `${identifier.toLowerCase()}-partic-hacktrack-${number}`
		});

		return res.json(hackathon);
	},

	async validateCode(req, res) {
		const { code } = req.query;

		const hacka = await Hackathon.findOne({
			$or: [
				{
					mentorLink: { $eq: code }
				},
				{
					participantLink: { $eq: code }
				}
			]
		});

		if (R.isEmpty(hacka)) {
			return res.json({ status: 'error' });
		}
		const isMentor = code.includes('mentor-hacktrack') ? true : false;

		const response = {
			_id: hacka._id,
			name: hacka.name,
			identifier: hacka.identifier,
			isMentor,
			status: 'ok'
		};

		return res.json(response);
	}
};
