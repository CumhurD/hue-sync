const chromecastService = require('./chromecast.service');
const contentService = require('./content.service');

let options = { videoName: 'video', fps: 1, imgFileName: "img", downloadLocation: './screenshots' }

async function sync(deviceId) {
    const playingContent = await chromecastService.getDeviceSafe(deviceId);

    const filePath = await contentService.downloadContent(playingContent.media.contentId);


}

module.exports = sync;