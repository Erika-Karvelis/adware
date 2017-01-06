import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './redux/store';
import configureRoute from './routes';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

export default class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router routes={ configureRoute() } history={ history } />
      </Provider>
    );
  }
}
