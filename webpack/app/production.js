const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconWebpackPlugin = require('favicons-webpack-plugin');
const dateFnsSupportedLang = require('../config/date-fns.config');

const packageJson = require('../../package.json');

const config = require('../config');
const webpackCommomConfig = require('../common');

module.exports = merge(webpackCommomConfig, {
  entry: [config.appIndex],
  mode: 'production',
  output: {
    path: config.appDist,
    filename: '[name]-[fullhash].js',
  },
  optimization: {
    runtimeChunk: true,
    minimize: true,
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /date\-fns[\/\\]/,
      new RegExp(
        `[/\\\\\](${dateFnsSupportedLang.join('|')})[/\\\\\]index\.js$`,
      ),
    ),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 5,
    }),
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 1000,
    }),
    new HtmlWebpackPlugin({
      template: config.appHTMLTemplate,
      title: config.appName,
      inject: true,
    }),
    new FaviconWebpackPlugin({
      logo: config.appFavicon,
      mode: 'webapp',
      favicons: {
        appName: packageJson.name,
        appDescription: packageJson.description,
        developerName: packageJson.author,
        developerURL: packageJson.repository.url,
        background: '#ddd',
        theme_color: '#333',
        icons: {
          coast: false,
          yandex: false,
        },
      },
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
  ],
});
