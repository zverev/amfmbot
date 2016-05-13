'use strict';

let request = require('request');

function dig(obj, path) {
    return path.split('.').reduce(function(obj, i) {
        return obj[i];
    }, obj);
}

function crawlJson(url, parser) {
    return new Promise(function(resolve, reject) {
        request(url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                try {
                    var json = JSON.parse(response.body);
                    resolve(parser(json));
                } catch (e) {
                    reject('parse error');
                }
            } else {
                reject('network error');
            }
        })
    });
}

// args.url
// args.artistKey
// args.songKey
module.exports = function (args) {
    return crawlJson(args.url, function (resp) {
        return {
            artist: dig(resp, args.artistKey) || '?',
            song: dig(resp, args.songKey) || '?'
        };
    });
}
