'use strict';

const camelcase = require('camelcase');

let env = process.env;

let requiredEnvVars = [
    'AMFMBOT_TELEGRAM_TOKEN',
    'OPENSHIFT_MONGODB_DB_URL'
];

let envs = {};
for (let i = 0; i < requiredEnvVars.length; i++) {
    let varName = requiredEnvVars[i];
    let varValue = process.env[varName];
    if (varValue) {
        envs[camelcase(varName)] = varValue;
    } else {
        throw `environment variable ${varName} is unset`;
    }
};

module.exports = {
    telegram: {
        token: envs.amfmbotTelegramToken
    },
    messages: {
        notfound: 'station not found',
        notsupported: 'station not supported',
        parseerror: 'parse error',
        crawlernotfound: 'internal error'
    },
    mongodb: {
        url: envs.openshiftMongodbDbUrl
    }
};
