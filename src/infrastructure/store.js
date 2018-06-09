import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { createLogger } from 'redux-logger';
import Immutable from 'immutable';
import thunk from 'redux-thunk';
import reducer from './reducer';

export const history = createHistory();
const router = routerMiddleware(history);

const getMiddelware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(router, thunk);
  }
  // logger for development
  return applyMiddleware(router, thunk, createLogger());
};

const initialStore = Immutable.Map();

export default createStore(reducer, initialStore, composeWithDevTools(getMiddelware()));
