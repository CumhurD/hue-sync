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
        console.error('Device not found!');
        return;
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

async function getDeviceSafe(deviceId) {
    let device = await getDevice(deviceId);

    if (!device) {
        console.log(`${deviceId} not found, will try again in 2 seconds..`);
        await sleep(2000);
        return await getDeviceSafe(deviceId);
    }

    return device;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

module.exports = {
    getDevices,
    getDevice,
    getDeviceSafe
}