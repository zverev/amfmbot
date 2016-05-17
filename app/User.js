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
    isBot: {
        type: Boolean,
        default: false
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

schema.statics.ensureUser = function(tgUser, isBot) {
    return new Promise((resolve, reject) => {
        this.findOne({
            id: tgUser.id
        }, (err, result) => {
            if (err) {
                return reject(err);
            }

            if (result) {
                resolve(result);
            } else {
                let user = new this({
                    id: tgUser['id'],
                    username: tgUser['username'],
                    firstName: tgUser['first_name'],
                    lastName: tgUser['last_name'],
                    isBot: isBot
                });

                user.save((err, result) => {
                    if (!err || err.code === 11000) {
                        resolve(user);
                    } else {
                        reject(new Error('error creating user'));
                    }
                });
            }
        });
    });
}

module.exports = mongoose.model('User', schema);
