const lodash = require('lodash');

const config = require('./config.json');
const defaultConfig= config.local;
const enviroment= process.env.NODE_ENV || 'local';
const enviromentConfig= config[enviroment];
const finalConfig = lodash.merge(defaultConfig, enviromentConfig);

global.gConfig = finalConfig;

module.exports = global.gConfig;