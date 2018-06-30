import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createLogger } from 'redux-logger';
import Immutable from 'immutable';
import thunk from 'redux-thunk';
import reducer from './reducer';

const getMiddelware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(thunk);
  }
  // logger for development
  return applyMiddleware(thunk, createLogger());
};

const initialStore = Immutable.Map();

export default createStore(reducer, initialStore, composeWithDevTools(getMiddelware()));
