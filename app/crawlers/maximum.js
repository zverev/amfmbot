'use strict';

var crawlJson = require('../utils/crawljson.js');

module.exports = function(options) {
    return crawlJson('http://www.maximum.ru/currenttrack.aspx?station=maximum', function (resp) {
        return {
            artist: resp.Current.Artist,
            song: resp.Current.Song
        };
    });
};
