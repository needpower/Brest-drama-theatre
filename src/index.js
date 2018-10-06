import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App/App';
import registerServiceWorker from './registerServiceWorker';
import store from './infrastructure/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('root'),
);
registerServiceWorker();
