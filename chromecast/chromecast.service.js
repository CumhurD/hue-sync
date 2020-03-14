const ConnectChromecast = require('./client');
const SessionFinder = require('./application');

const host = "192.168.1.123";

const getChromecastApplication = async () =>{
    return await new Promise((resolve, reject)=>{
        ConnectChromecast(host).then(client =>{
            SessionFinder(client).then(application =>{
                resolve(application);
            });
        });
    });
}



module.exports = {
    getChromecastApplication
};


