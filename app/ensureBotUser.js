// create bot user record in datebase if it does'nt exist

const mongoose = require('./mongoose.js');
const User = require('./User.js');

function ensureConnection() {
    return new Promise((resolve, reject) => {
        if (mongoose.connection.readyState === 1) {
            resolve();
        } else {
            mongoose.connection.on('open', function() {
                resolve();
            });
        }
    });
}

function getMe(tg) {
    return new Promise((resolve, reject) => {
        tg.call('getMe', {}, (resp) => {
            if (!resp.ok) {
                reject(new Error('cannot get telegram bot user info'));
            } else {
                resolve(resp.result);
            }
        })
    });
}

function ensureBotRecord(tgUser) {
    return new Promise((resolve, reject) => {
        var user = new User({
            id: tgUser['id'],
            username: tgUser['username'],
            firstName: tgUser['first_name'],
            lastName: tgUser['last_name']
        });

        user.save((err, result) => {
            if (!err || err.code === 11000) {
                resolve();
            } else {
                return reject(new Error('error creating bot user'));
            }
        });
    });
}

module.exports = function(tg) {
    return Promise.resolve(true)
        .then(function () {
            return ensureConnection();
        })
        .then(function () {
            return getMe(tg);
        })
        .then(function (tgUser) {
            return ensureBotRecord(tgUser);
        });
}
