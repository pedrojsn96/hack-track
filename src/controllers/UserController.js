const User = require('../models/User');

module.exports = {
	async store(req, res) {
		const { name, email, role, isMentor, bio, hackaId } = req.body;

		const user = await User.create({
			name,
			email,
			role,
			isMentor,
			bio,
			hackathon: hackaId
		});

		return res.json(user);
	}
};
