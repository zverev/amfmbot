'use strict';

const initTelegramCommands = require('./initTelegramCommands.js');
const mongoose = require('./mongoose.js');
const config = require('./config.js');
const User = require('./User.js');

let tg = require('telegram-node-bot')(config.telegram.token);

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

Promise.resolve(true)
    .then(function() {
        return getMe(tg);
    })
    .then(function(tgUser) {
        return User.ensureUser(tgUser, true);
    })
    .then(function () {
        initTelegramCommands(tg);
    })
    .then(function() {
        console.log('ready!');
    }, function(err) {
        console.error(err.message);
        mongoose.disconnect(function() {
            console.log('disconnected');
            process.exit(228);
        });
    });
