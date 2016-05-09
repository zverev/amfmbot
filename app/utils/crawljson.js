'use strict';

var request = require('request');

module.exports = function(url, parser) {
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
