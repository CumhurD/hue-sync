const fs = require('fs');
const youtubedl = require('youtube-dl');

async function download(videoId, filePath) {
    return new Promise((resolve, reject) => {
        const videoLink = `http://www.youtube.com/watch?v=${videoId}`;

        const video = youtubedl(videoLink, ['--format=133'], { cwd: __dirname });

        video.on('info', function (info) {
            debugger;
            console.log('Download started');
            console.log('filename: ' + info._filename);
            console.log('size: ' + info.size);
            video.pipe(fs.createWriteStream(filePath));
        });

        video.on('complete', function complete(info) {
            debugger;
            console.log('filename: ' + info._filename + ' already downloaded.');

            resolve(info._filename);
        });

        video.on('end', function () {
            debugger;
            console.log('finished downloading!');
            resolve(filePath);
        });
    });
}

module.exports = download;