const chromecastService = require('../../services/chromecast.service');


exports.list = (req, res) => {
    const devices = chromecastService.getDevices();

    res.send(devices);
};

exports.getById = async (req, res) => {
    const device = await chromecastService.getDevice(req.params.castId);

    res.send(device);
};
