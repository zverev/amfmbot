'use strict';

var crawlJson = require('../utils/crawljson.js');

module.exports = function(options) {
    return crawlJson('http://montecarlo.ru/currenttrack.asp?station=montecarlo', function (resp) {
        return {
            artist: resp.Current.Artist,
            song: resp.Current.Song
        };
    });
};
