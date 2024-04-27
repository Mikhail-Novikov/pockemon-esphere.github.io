const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('./config');

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(eot|png|ttf|svg|woff|woff2)$/,
        type: 'asset/inline',
      },
      {
        test: /\.(png|gif|jpe?g)$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    alias: {
      '@shared': config.appShared,
      '@styles': config.appStyles,
      '@entities': config.appEntities,
      '@features': config.appFeatures,
      '@widgets': config.appWidgets,
      '@processes': config.appProcesses,
      '@pages': config.appPages,
      '@src': config.appDir,
      '@packageSrc': config.appPackageJson,
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};
