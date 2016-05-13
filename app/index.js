'use strict';

const config = require('./config.js');
const stations = require('./stations.json');
const StationsManager = require('./StationsManager.js');

let TelegramBot = require('node-telegram-bot-api');
let stationsManager = new StationsManager(stations);

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

    let station = stationsManager.find(msg.text);

    if (!station) {
        return;
    }

    let crawler;
    try {
        crawler = require(`./crawlers/${station.crawler.type}Crawler.js`);
    } catch (e) {
        if (e.code === 'MODULE_NOT_FOUND') {
            // TODO: handle an error
        }
    }
    if (crawler) {
        crawler.call(null, station.crawler.args).then(function(resolved) {
            bot.sendMessage(fromId, createResponseString(station, resolved));
        }, function() {
            // TODO: handle an error
        });
    }
});

function createResponseString(station, track) {
    return `${station.name}\n${track.artist} - ${track.song}`;
}
