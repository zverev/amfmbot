'use strict';

const mongoose = require('mongoose');
const config = require('./config.js');

mongoose.connect(config.mongodb.url);

module.exports = mongoose;
