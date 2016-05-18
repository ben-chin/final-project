var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

var ROOT_DIR = path.resolve(__dirname, '../' );
var JS_DIR = path.resolve(ROOT_DIR, 'assets', 'js');
var BUNDLE_DIR = path.resolve(ROOT_DIR, 'assets', 'bundles');

module.exports = {
  context: ROOT_DIR,

  entry: {
    report: [
      'babel-polyfill',
      'webpack-dev-server/client?http://192.168.33.15:3000',
      'webpack/hot/only-dev-server',
      path.resolve(JS_DIR, 'report', 'index'),
    ],
    progress: [
      'babel-polyfill',
      'webpack-dev-server/client?http://192.168.33.15:3000',
      'webpack/hot/only-dev-server',
      path.resolve(JS_DIR, 'progress', 'index'),
    ]
  },

  output: {
      path: BUNDLE_DIR,
      filename: "[name]-[hash].js",
      publicPath: 'http://192.168.33.15:3000/assets/bundles/',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new BundleTracker({filename: 'build/webpack-stats.json'}),
  ],

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel'],
    }],
  },

  resolve: {
    root: [JS_DIR],
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx']
  },
};
