const childProc = require('child_process');

const self = this;
self.workingProcess;
self.tempDir = makeUnixTmpDir(); 

function makeUnixTmpDir() {
    return childProc.execSync('mktemp -d -t lighthouse.XXXXXXX').toString().trim();
}


function start(link) {
    if (self.workingProcess)
        self.workingProcess.kill();

        self.workingProcess = childProc.spawn('/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome', [
            '--no-first-run',
            '--user-data-dir=' + self.tempDir,
            // '--profile-directory="Guest Profile"',
            link,
        ], {  });
}

module.exports = start;