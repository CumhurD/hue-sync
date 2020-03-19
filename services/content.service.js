const chromecastService = require('./chromecast.service');
const youtubeDownloader = require('./youtube-downloader');
const fs = require('fs');
const path = require('path');

async function getContent(deviceId) {
    debugger;
    const playingContent = await chromecastService.getDevice(deviceId);

    const filePath = path.join('/Users/cumhurduzlu/Git/hue-sync-fe/public' + '/videos/', playingContent.media.contentId + '.mp4');
    if (!fs.existsSync(filePath)) {
        console.warn('download started!');
        const downloadedContent = await youtubeDownloader(playingContent.media.contentId, filePath);
    }

    playingContent.filePath = './videos/' + playingContent.media.contentId + '.mp4';
    return playingContent;
}

module.exports = {
    getContent
};