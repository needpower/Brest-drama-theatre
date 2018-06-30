import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import './index.css';
import App from './App/App';
import registerServiceWorker from './registerServiceWorker';
import store from './infrastructure/store';
import history from './infrastructure/history';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/fog" component={App} />
    </Router>
  </Provider>,

  document.getElementById('root'),
);
registerServiceWorker();
