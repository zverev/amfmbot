'use strict';

module.exports = class StationsManager {
    constructor (stations) {
        this._stations = stations;
    }

    find (text) {
        return this._stations.find(function (station) {
            var reg = new RegExp(station.reg || station.name, 'gi');
            if (
                text.match(reg) ||
                text.trim() == station.freq
            ) {
                return true;
            }
        });
    }
}
