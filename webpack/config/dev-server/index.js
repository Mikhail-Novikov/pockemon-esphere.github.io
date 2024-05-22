const paths = require('../paths');
const proxy = require('./proxy');

module.exports = {
  devServer: {
    port: 3001,
    allowedHosts: 'all',
    open: true,
    static: [paths.appDist],
    historyApiFallback: true,
    hot: true,
    proxy,
  },
};
