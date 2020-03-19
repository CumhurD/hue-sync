const chromecastService = require('../../services/chromecast.service');
const contentService = require('../../services/content.service');


exports.list = (req, res) => {
    const devices = chromecastService.getDevices();

    res.send(devices);
};

exports.getById = async (req, res) => {
    const device = await contentService.getContent(req.params.castId);

    res.send(device);
};
