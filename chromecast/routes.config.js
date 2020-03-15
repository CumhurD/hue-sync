const ChromeCastController = require('./controllers/chromecast.controller');

exports.routesConfig = function (app) {
    app.get('/chromecast', [
        ChromeCastController.list
    ]);
    app.get('/chromecast/:castId', [
        ChromeCastController.getById
    ]);
};