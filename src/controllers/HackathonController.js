const Hackathon = require('../models/Hackathon');

module.exports = {
	async store(req, res) {
		const { name, identifier } = req.body;

		const hackaExists = await Hackathon.findOne({ identifier: identifier });

		if (hackaExists) {
			return res.json(hackaExists);
		}

		const number = new Date().getTime() % 1000;

		const hackathon = await Hackathon.create({
			name,
			identifier,
			mentorLink: `${identifier.toLowerCase()}-mentor-hacktrack-${number}`,
			participantLink: `${identifier.toLowerCase()}-partic-hacktrack-${number}`
		});

		return res.json(hackathon);
	}
};
