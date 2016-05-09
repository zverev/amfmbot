'use strict';

var crawlJson = require('../utils/crawljson.js');

module.exports = function(options) {
    return crawlJson('http://www.dfm.ru/currenttrack.aspx?station=dfm', function (resp) {
        return {
            artist: resp.Current.Artist,
            song: resp.Current.Song
        };
    });
};
