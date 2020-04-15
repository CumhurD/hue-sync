const chromecastService = require('./chromecast.service');
const youtubeDownloader = require('./youtube-downloader');
const fs = require('fs');
const path = require('path');

async function getContent(deviceId) {
    const playingContent = await chromecastService.getDevice(deviceId);

    await downloadContent(playingContent.media.contentId);

    playingContent.filePath = './videos/' + playingContent.media.contentId + '.mp4';
    return playingContent;
}

async function downloadContent(videoId){
    const filePath = path.join('/Users/cumhurduzlu/Git/hue-sync-fe/public/videos/', videoId + '.mp4');

    if (!fs.existsSync(filePath)) {
        console.warn('download started!');
        const downloadedContent = await youtubeDownloader(videoId, filePath);
    }

    return filePath;
}

module.exports = {
    getContent,
    downloadContent
};