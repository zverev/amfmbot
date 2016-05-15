'use strict';

const initTelegramCommands = require('./initTelegramCommands.js');
const ensureBotUser = require('./ensureBotUser.js');
const mongoose = require('./mongoose.js');
const config = require('./config.js');

let tg = require('telegram-node-bot')(config.telegram.token);

Promise.resolve(true)
    .then(function () {
        return ensureBotUser(tg);
    })
    .then(function () {
        initTelegramCommands(tg);
    })
    .then(function () {
        console.log('ready!');
    }, function (err) {
        console.error(err.message);
        mongoose.disconnect(function () {
            console.log('disconnected');
            process.exit(228);
        });
    });
