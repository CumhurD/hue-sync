const ChromeCastService = require('./chromecast/chromecast.service');
const browser = require('./chrome');
const UPDATE_INTERVAL = 1000;

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

async function sync(castedApp) {
    const currentContent = await castedApp.getStatus();

    let isUpdateNeeded = shouldSync(self.oldContent, currentContent);
    self.oldContent = currentContent;

    if (isUpdateNeeded) {
        const link = `https://youtu.be/${currentContent.media.contentId}?t=${Math.ceil(currentContent.currentTime + 1.3)}`;

        browser(link);
    }
}

async function start() {
    const castedApp = await ChromeCastService.getChromecastApplication();

    setInterval(() => sync(castedApp), UPDATE_INTERVAL);
}

start();