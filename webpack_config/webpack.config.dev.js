var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BaseConfig = require('./webpack.config.base.js');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  name: 'dev-server',
  devtool: 'source-map',
  entry: BaseConfig.Entries,
  context: BaseConfig.CLIENT_DIR,
  output: {
    path: BaseConfig.Dist,
    publicPath: '/',
    filename: BaseConfig.BundleName + '.js'
  },
  module: {
    loaders: BaseConfig.Loaders
  },
  plugins: [
    new ExtractTextPlugin(BaseConfig.BundleName + '.css'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    })
  ]
};

