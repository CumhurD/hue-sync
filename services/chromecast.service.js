var chromecasts = require('chromecasts')()

var devices = [];

chromecasts.on('update', function (player) {
    console.warn('New device found! ' + player.name);
    devices.push(player);
});

function getDevices() {
    let devs = devices
        .map(device => { return { name: device.name, host: device.host } });
    return devs;
}

async function getDevice(deviceId) {
    if (!deviceId)
        return {};
    let device = devices.find(d => d.name == deviceId);

    if (!device) {
        return console.error('Device not found!');
    }

    return await new Promise((resolve, reject) => {
        device.status((err, status) => {
            if (err)
                reject(err);
            else
                resolve(status);
        });
    });
}

module.exports = {
    getDevices,
    getDevice
}