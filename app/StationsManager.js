'use strict';

module.exports = class StationsManager {
    constructor (stations) {
        this._stations = stations;
    }

    find (text) {
        return this._stations.find(function (station) {
            if (
                text.match(new RegExp(station.reg, 'gi')) ||
                text.trim() == station.freq
            ) {
                return true;
            }
        });
    }
}
