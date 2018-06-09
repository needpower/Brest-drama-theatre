import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import './index.css';
import App from './App/App';
import registerServiceWorker from './registerServiceWorker';
import store, { history } from './infrastructure/store';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
