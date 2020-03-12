const Castv2Client = require('castv2-client');
const Client = Castv2Client.Client;

const client = new Client();

const connect = (host) => {
    console.log('Connecting to device: ' + this.host);

    return new Promise((resolve, reject) => {
        client.on('error', (err) => {
            console.error('Chromecast connection lost!');
            client.close();
            reject(err);
        });

        client.connect(host, () => {
            console.log('Connected');
            resolve(client);
        });
    });
}

module.exports = connect;