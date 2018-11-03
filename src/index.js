import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'infrastructure/store';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const { store } = configureStore({
  preloadedState: window.REDUX_STATE,
});

ReactDOM.hydrate(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('root'),
);
registerServiceWorker();
