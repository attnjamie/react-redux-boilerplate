var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var CLIENT_DIR = path.resolve(__dirname, '../client');
var SHARED_DIR = path.resolve(__dirname, '../shared');
var SERVER_DIR = path.resolve(__dirname, '../server');
var PORT = 8080;
var HOST = 'localhost';
var HOST_URI = `http://${HOST}:${PORT}`;

module.exports = {
  CLIENT_DIR: CLIENT_DIR,
  SERVER_DIR: SERVER_DIR,
  Port: 3000,
  BundleName: 'bundle',
  Dist: path.join(__dirname, '..', 'dist'),
  Entries: [
    'webpack-hot-middleware/client',
    path.resolve(CLIENT_DIR, 'index.js'),
    path.resolve(CLIENT_DIR, 'styles', 'main.scss')
  ],
  Loaders: [
    {
      test: /\.js$/,
      include: [ CLIENT_DIR, SHARED_DIR, SERVER_DIR ],
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        plugins: [
          [
            'react-transform', {
              transforms: [{
                transform: 'react-transform-hmr',
                imports: ['react'],
                locals: ['module']
              }]
            }
          ]
        ]
      },
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader")
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
    }
  ],
  Options: {
    colors: true,
    hash: false,
    timings: false,
    chunks: true,
    chunkModules: false,
    modules: false,
    children: true,
    version: true,
    cached: false,
    cachedAssets: false,
    reasons: false,
    source: true,
    errorDetails: false
  }
};
