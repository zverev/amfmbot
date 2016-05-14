'use strict';

const config = require('./config.js');
const resolveTrack = require('./resolveTrack.js');

var tg = require('telegram-node-bot')(config.telegram.token)

tg.router
    .when(['abuse'], 'AbuseController')
    .otherwise('StationController');

tg.controller('AbuseController', ($) => {
    $.sendMessage('abuse accepted');
});

tg.controller('StationController', ($) => {
    resolveTrack($.message.text).then(responseMessage => {
        $.sendMessage(responseMessage);
    }, errcode => {
        $.sendMessage(config.messages[errcode] || '_error_');
    });
});
