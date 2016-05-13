'use strict';

const config = require('./config.js');
const stations = require('./stations.json');

var TelegramBot = require('node-telegram-bot-api');

var bot = new TelegramBot(config.telegram.token, {
    polling: true
});

bot.onText(/\/abuse/, function(msg, match) {
    var fromId = msg.from.id;
    bot.sendMessage(fromId, 'abuse accepted').then(null, function() {
        console.log('error delivering message')
    })
});

bot.onText(/\/([a-z]+)/, function(msg, match) {
    var fromId = msg.from.id;
    var requestedStation = match[1];

    let stationsIds = stations.map(function(station) {
        return station.id;
    });

    if (stationsIds.indexOf(requestedStation) + 1) {
        let station = stations.find(function (station) {
            return station.id === requestedStation;
        });
        let crawler;
        try {
            crawler = require(`./crawlers/${station.crawler.type}Crawler.js`);
        } catch (e) {
            if (e.code === 'MODULE_NOT_FOUND') {
                // TODO: handle an error
            }
        }
        if (crawler) {
            crawler.call(null, station.crawler.args).then(function (resolved) {
                bot.sendMessage(fromId, createResponseString(resolved));
            }, function () {
                // TODO: handle an error
            });
        }
    }
});

function createResponseString(info) {
    return `${info.artist} - ${info.song}`;
}
