'use strict';

var crawlJson = require('../utils/crawljson.js');

module.exports = function(options) {
    return crawlJson('http://radiopleer.com/info/ultra.txt', function (resp) {
        return {
            artist: resp.artist,
            song: resp.song
        };
    });
};
