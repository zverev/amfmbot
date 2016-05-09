var request = require('request');

var url = 'http://radiopleer.com/info/rock.txt';

module.exports = function(options) {
    return new Promise(function(resolve, reject) {
        request(url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                try {
                    var json = JSON.parse(response.body);
                    resolve({
                        artist: json.artist,
                        song: json.song
                    });
                } catch (e) {
                    reject('parse error');
                }
            } else {
                reject('network error');
            }
        })
    });
}
