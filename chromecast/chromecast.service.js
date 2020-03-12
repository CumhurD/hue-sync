const ConnectChromecast = require('./client');
const SessionFinder = require('./media');


const host = "192.168.1.123";

ConnectChromecast(host).then(client =>{
    SessionFinder(client).then(application =>{
        application.getStatus((a, b)=>{
            const link = `https://youtu.be/${b.media.contentId}?t=${b.currentTime}`;
        })
    });
});
