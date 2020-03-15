var chromecasts = require('chromecasts')()

chromecasts.on('update', function (player) {
    console.warn('New device found! ' + player.name);
});

function getDevices() {
    let devices = chromecasts.players
        .map(device => { return { name: device.name, host: device.host } });
    return devices;
}

async function getDevice(deviceId) {
    let device = chromecasts.players.find(d => d.name == deviceId);

    if (!device) {
        throw 'Device not found!';
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