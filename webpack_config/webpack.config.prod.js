var path = require('path');
var Webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BaseConfig = require('./webpack.config.base.js');

module.exports = {
  devtool: 'source-map',
  entry: BaseConfig.Entries,
  output: {
    path: BaseConfig.Dist,
    publicPath: '/',
    filename: BaseConfig.BundleName + '.min.js'
  },
  module: {
    loaders: BaseConfig.Loaders
  },
  plugins: [
    new Webpack.optimize.OccurenceOrderPlugin(),
    new Webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new ExtractTextPlugin(BaseConfig.BundleName + '.min.css')
  ]
};
