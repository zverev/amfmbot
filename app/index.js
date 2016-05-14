'use strict';

const config = require('./config.js');
const resolveTrack = require('./resolveTrack.js');

let TelegramBot = require('node-telegram-bot-api');

let bot = new TelegramBot(config.telegram.token, {
    polling: true
});

bot.onText(/\/abuse/, function(msg, match) {
    let fromId = msg.from.id;
    bot.sendMessage(fromId, 'abuse accepted').then(null, function() {
        console.log('error delivering message')
    })
});

bot.on('text', function(msg) {
    let fromId = msg.from.id;

    resolveTrack(msg.text).then(function (responseMessage) {
        bot.sendMessage(fromId, responseMessage);
    }, function (errcode) {
        debugger;
        var errorMessage = config.messages[errcode];
        bot.sendMessage(fromId, errorMessage || '_error_');
    });
});
