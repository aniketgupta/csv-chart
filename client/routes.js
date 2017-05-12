/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/App/App';
import HomePage from './modules/Home/pages/HomePage/HomePage.js'
import ChartPage from './modules/Chart/pages/ChartPage/ChartPage.js'

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

export default (
  <Route path="/" component={App}>
    <IndexRoute getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Home/pages/HomePage/HomePage').default);
        });
      }}
    />
    <Route
      path="/chart"
      component={ChartPage}
    />
  </Route>

);
