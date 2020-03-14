const ChromeCastService = require('./chromecast/chromecast.service');
const childProc = require('child_process');
const UPDATE_INTERVAL = 5000;

// const youtubeLinkFormat = `https://youtu.be/${application.media.contentId}?t=${application.currentTime}`
const self = this;
self.oldContent = {};

function shouldSync(oldContent, newContent) {
    let currentTime = Math.ceil(newContent.currentTime);
    let oldTime = Math.ceil(oldContent.currentTime);

    let diff = currentTime - (oldTime + UPDATE_INTERVAL / 1000);

    let isTimeSyncNeeded = diff > 1 || diff < -1 || isNaN(diff);
    let isContentChanged = !oldContent.media || oldContent.media.contentId != newContent.media.contentId

    if (isContentChanged)
        console.warn('Playing media changed. Sync started.');
    else if (isTimeSyncNeeded)
        console.warn('Media time is not sync. Sync started.');
    else
        console.debug('Media & time is sync.');

    return isTimeSyncNeeded || isContentChanged;
}

async function sync(castedApp){
    const currentContent = await castedApp.getStatus();

    let isUpdateNeeded = shouldSync(self.oldContent, currentContent);
    self.oldContent = currentContent;

    if (isUpdateNeeded) {
        console.warn('Update needed! oldTime:' + oldTime + ' currentTime:' + currentTime + 'diff: ' + diff);
        const link = `https://youtu.be/${playingContent.media.contentId}?t=${currentTime}`;

        childProc.exec(`open -a "Google Chrome" ${link}`, function (err) {
            if (err) {
                console.error(err);
            }
            else {
                console.log("success open");
            }
        });
    }
    else {
        console.warn('Update not needed! diff: ' + diff);
    }
}

async function start() {
    const castedApp = await ChromeCastService.getChromecastApplication();

    setInterval(() => sync(castedApp), UPDATE_INTERVAL);
}

start();