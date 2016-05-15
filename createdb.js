'use strict';

const mongoose = require('./app/mongoose.js');
const config = require('./app/config.js');

var tg = require('telegram-node-bot')(config.telegram.token);

mongoose.set('debug', true);

function establishConnection() {
    return new Promise((resolve, reject) => {
        mongoose.connection.on('open', function() {
            resolve();
        });
    });
}

function dropCollection() {
    let collectionName = 'users';
    return new Promise((resolve, reject) => {
        mongoose.connection.db.listCollections().toArray(function(err, collections) {
            if (err) {
                return reject(new Error('error listing collections'));
            }

            let collection = collections.find(function(c) {
                return c.name === collectionName;
            });

            if (collection) {
                mongoose.connection.db.dropCollection(collectionName, (err, result) => {
                    if (err) {
                        debugger;
                        return reject(new Error(`error dropping ${collectionName} collection`));
                    }
                    resolve();
                });
            } else {
                resolve();
            }
        });
    });
}

function getMe(tg) {
    return new Promise((resolve, reject) => {
        debugger;
        tg.call('getMe', {}, (resp) => {
            if (!resp.ok) {
                reject(new Error('cannot get telegram bot user info'));
            } else {
                resolve(resp.result);
            }
        })
    });
}

function createTgBotUser(tgUser) {
    const User = require('./app/User.js');

    return new Promise((resolve, reject) => {
        var user = new User({
            id: tgUser['id'],
            username: tgUser['username'],
            firstName: tgUser['first_name'],
            lastName: tgUser['last_name']
        });

        debugger;
        user.save((err, result) => {
            if (err) {
                return reject(new Error('error saving user'));
            }
            resolve();
        });
    });
}


Promise.resolve(true)
    .then(function() {
        console.log('connecting..');
        return establishConnection();
    })
    .then(function() {
        console.log('creating collection..');
        return dropCollection();
    })
    .then(function() {
        console.log('getting telegram bot name..');
        return getMe(tg);
    })
    .then(function(tgUser) {
        console.log('adding bot user..');
        return createTgBotUser(tgUser);
    })
    .then(function () {
        console.log('done!');
    }, function(error) {
        console.log(error.message);
    });
