const ffmpeg = require('ffmpeg')
const chromecastService = require('./chromecast.service');
const contentService = require('./content.service');
const terminalImage = require('terminal-image');

let options = { videoName: 'video', fps: 1, imgFileName: "img", downloadLocation: './screenshots' }

async function getFrames(deviceId) {
    const playingContent = await chromecastService.getDeviceSafe(deviceId);
    const filePath = await contentService.downloadContent(playingContent.media.contentId);

    return new Promise((resolve, reject) => {
        var process = new ffmpeg(filePath);
        process.then(function (video) {
            const filePath = `./screenshots/${playingContent.media.contentId}`;
            video.fnExtractFrameToJPG(filePath, {
                frame_rate: 2,
                file_name: 'frame'
            }, function (error, files) {
                if (!error) {
                    resolve(filePath);
                }
                reject(error);
            });
        }, function (err) {
            reject(err);
        });
    })

}

async function sync(deviceId) {
    await getFrames(deviceId);


}

module.exports = sync;