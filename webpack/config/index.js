const settings = require('./settings');
const paths = require('./paths');
const devServer = require('./dev-server');

const config = { ...settings, ...paths, ...devServer };

module.exports = config;
