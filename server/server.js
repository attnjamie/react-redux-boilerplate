'use strict';

import express from 'express';
import path from 'path';
import fs from 'fs';

import webpack from 'webpack';
import BaseConfig from '../webpack_config/webpack.config.base.js';
import DevConfig from '../webpack_config/webpack.config.dev.js';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux'
import { createMemoryHistory, RouterContext, match } from 'react-router';

import configureStore from '../shared/store';
import { Routes } from '../shared/routes';

// server creation and config
let app = express();
let port = process.env.PORT || BaseConfig.Port;
let host = process.env.HOST || 'localhost';

const isDevelopment = process.env.NODE_ENV !== 'production';
const isProduction = process.env.NODE_ENV === 'production';

// webpack things
if (isDevelopment) {
    const compiler = webpack(DevConfig);
    app.use(require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: DevConfig.output.publicPath,
      stats: BaseConfig.Options,
      hot: true,
      historyApiFallback: true
    }));
    app.use(require('webpack-hot-middleware')(compiler));
}

if (isProduction) {
    app.use(express.static(BaseConfig.Dist));
}

app.use('/', express.static(path.join(__dirname, '..', 'public')))

app.use(function(req, res) {
  const history = createMemoryHistory();

  match({ routes: Routes, location: req.url }, (err, redirectLocation, renderProps) => {
    const initialState = {
      currentUser: {}
    };

    let store = configureStore(initialState);
    if(err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if(!renderProps) {
      return res.status(404).end('Not found');
    }
    const InitialView = (
      <Provider className="root" store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    );

    const finalState = store.getState();
    const html = ReactDOMServer.renderToString(InitialView)
    res.status(200).end(renderBody(html, finalState));
  })
})

const webServer = app.listen(port, host, function (err) {
  if (err) throw err;
  console.log('Server is listening to port: http://%s:%d', host, port);
});

function renderBody(html, initialState) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <link href="bundle${isProduction ? '.min' : ''}.css" rel="stylesheet" type="text/css" />
        <link rel="icon" href="./favicon.ico" type="image/x-icon" />
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <title>React Redux</title>
      </head>
      <body>
        <container id="app"><div>${html}</div></container>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="bundle${isProduction ? '.min' : ''}.js"></script>
      </body>
    </html>
  `
}
