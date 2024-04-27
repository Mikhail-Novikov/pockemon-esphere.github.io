const webpack = require('webpack');
const { merge } = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('../config');
const webpackCommomConfig = require('../common');

module.exports = merge(webpackCommomConfig, {
  entry: [config.appDevIndex],
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: config.devServer,
  output: {
    path: config.appDist,
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: config.appHTMLTemplate,
      title: config.appName,
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
  ],
});
