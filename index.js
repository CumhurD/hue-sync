const chromeCastApplication = require('./chromecast/chromecast.service');
const childProc = require('child_process');


// const youtubeLinkFormat = `https://youtu.be/${application.media.contentId}?t=${application.currentTime}`

chromeCastApplication().then(castedApp => {
    castedApp.getStatus((err, playingContent) =>{
        const link = `https://youtu.be/${playingContent.media.contentId}?t=${playingContent.currentTime}`;

        childProc.exec(`open -a "Google Chrome" ${link}`,  function (err) {
            if (err) { 
                console.error(err);
            }
            else {
                console.log("success open");
            }
        });
    });
});