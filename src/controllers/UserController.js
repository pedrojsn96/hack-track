const User = require('../models/User');
const Hackathon = require('../models/Hackathon');
const mailer = require('../modules/mailer');

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

		const hacka = await Hackathon.findOne({ _id: hackaId });

		if (isMentor && role === 'Owner') {
			mailer.sendMail(
				{
					to: email,
					subject: 'Your hackathon its on',
					template: '/hackathon_create',
					context: {
						hackatrack: `https://hacktrack-open-monitor.herokuapp.com/monitor/${hackaId}`,
						mentor: hacka.mentorLink,
						participant: hacka.participantLink
					}
				},
				err => {
					if (err) console.log(err);
				}
			);
		} else if (isMentor) {
			mailer.sendMail(
				{
					to: email,
					subject: 'Your hackathon its on',
					template: '/hackathon_mentor',
					context: {
						hackatrack: `https://hacktrack-open-monitor.herokuapp.com/monitor/${hackaId}`
					}
				},
				err => {
					if (err) console.log(err);
				}
			);
		} else {
			mailer.sendMail(
				{
					to: email,
					subject: 'Your hackathon its on',
					template: '/hackathon_participant'
				},
				err => {
					if (err) console.log(err);
				}
			);
		}

		return res.json(user);
	}
};
