const File = require('../models/File');
const Track = require('../models/Track');

module.exports = {
	async store(req, res) {
		const { originalname: name, size, key, location: url = '' } = req.file;
		const { trackId } = req.body;

		const file = await File.create({
			name,
			size,
			key,
			url,
			track: trackId
		});

		const track = await Track.findOne({ _id: trackId });
		track.files.push(file.url);

		await track.save();
		req.io.emit('track');

		return res.json(file);
	}
};
