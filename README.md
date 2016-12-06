# react-redux-boilerplate

# Operation
## Installation
This repository assumes that `npm` is installed. If you don't have it installed, here are [installation instructions](https://docs.npmjs.com/getting-started/installing-node).

1. Clone this repo.
2. Go into the repo directory
3. Run `npm install` to install dependencies
4. Run `npm start` to build and run the production server.
5. Direct your browser to [http://localhost:3000](http://localhost:3000).

You can also change the port setting in `webpack.config.base.js`.

## Development
This repo has shared components in the shared folder (things that are used by the server and by client side). It uses SSR React and Redux to set a state between
client and server. Assets can be placed in the public folder.

## Running the Dev Server
`npm run dev`

## Build and run Production Server
`npm start`
