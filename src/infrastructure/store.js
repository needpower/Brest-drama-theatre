import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import errorHandler from './error-handler';
import reducer from './reducer';

const getMiddelware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(errorHandler, thunk);
  }
  // logger for development
  return applyMiddleware(errorHandler, thunk, logger);
};

export default createStore(reducer, composeWithDevTools(getMiddelware()));
