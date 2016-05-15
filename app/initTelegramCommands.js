const resolveTrack = require('./resolveTrack.js');
const config = require('./config.js');

module.exports = function(tg) {
    tg.router
        .when(['abuse'], 'AbuseController')
        .otherwise('StationController');

    tg.controller('AbuseController', ($) => {
        $.sendMessage('abuse accepted');
    });

    tg.controller('StationController', ($) => {
        resolveTrack($.message.text).then(responseMessage => {
            $.sendMessage(responseMessage);
        }, errcode => {
            $.sendMessage(config.messages[errcode] || '_error_');
        });
    });
}
