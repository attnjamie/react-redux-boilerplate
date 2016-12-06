import { Redirect, Router, Route, IndexRoute, browserHistory } from 'react-router';
import React from 'react';


import App from './components/app';
import HomePage from './components/home_page';
import DemoPage from './components/demo_page';


export const Routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="demo" component={DemoPage} />
  </Route>
);

export default class AppRouter extends React.Component {
  render() {
    return (
      <Router routes={Routes} history={browserHistory} />
    )
  }
}

