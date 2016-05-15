'use strict';

const StationsManager = require('./StationsManager');
const stations = require('./stations.json');

let stationsManager = new StationsManager(stations);

module.exports = function(userMessage) {
    return new Promise(function (resolve, reject) {

        let station = stationsManager.find(userMessage);

        if (!station) {
            reject('notfound');
            return;
        }

        if (!station.crawler) {
            reject('notsupported');
            return;
        }

        let crawler;
        try {
            crawler = require(`./crawlers/${station.crawler.type}Crawler.js`);
        } catch (e) {
            if (e.code === 'MODULE_NOT_FOUND') {
                reject('crawlernotfound');
            } else {
                reject('parseerror');
            }
        }

        if (crawler) {
            crawler.call(null, station.crawler.args).then(function(resolved) {
                resolve(createResponseString(station, resolved));
            }, function() {
                reject('parseerror');
            });
        }
    });

    function createResponseString(station, track) {
        return `${station.name}\n${track.artist} - ${track.song}`;
    }
}
