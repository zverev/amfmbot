'use strict';

const mongoose = require('./mongoose.js');
const config = require('./config.js');

let schema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String
    },
    username: {
        type: String
    },
    lastStations: [String]
});

schema.methods.pushStation = function(station) {
    if (this.lastStations.indexOf(station) === -1) {
        this.lastStations.shift(station);
        if (this.lastStations.length > config.stations.menuLength) {
            while (this.lastStations.length !== config.stations.menuLength) {
                this.lastStations.pop();
            }
        }
    }
}

module.exports = mongoose.model('User', schema);
