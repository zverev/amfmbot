var crawl = require('./crawlers/rockfm.js');

crawl().then(function (resp) {
    console.log(`${resp.artist} - ${resp.song}`);
}, function (e) {
    console.log(e);
})
