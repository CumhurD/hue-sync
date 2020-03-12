const Youtube = require('./Youtube');

function getMedia(client) {
    return new Promise((resolve, reject) => {
        client.getSessions((err, sessions) => {
            if (err) {
                reject(err);
            };

            const session = sessions.shift()

            if (session) {
                client.join(session, Youtube, (a, application) => {
                    resolve(application);
                });
            }
            else {
                reject('Nothing is playing now.');
            }
        });
    });
}

module.exports = getMedia;