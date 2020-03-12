const Castv2Client = require('castv2-client');
const Client = Castv2Client.Client;
const Youtube = require('./Youtube');


function connect(host, callback) {
    console.log('Connecting to device: ' + this.host);

    client.connect(host, () => {
        console.log('Connected');

        callback();
    });
}

function findSessions(callback) {
    client.getSessions((err, sessions) => {
        if (err) throw err;

        const session = sessions.shift()

        if (session) {
            client.join(session, Youtube, callback)
        }
    })
}

var client = new Client();
client.on('error', (err) => {
    console.error('Error: %s', err.message);
    client.close();
});

let host = "192.168.1.123";
connect(host, function () {
    findSessions((err, player) => {
        debugger;
        player.getStatus((test,test2)=>{
            debugger;

        })
    });
});