import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import errorHandler from './error-handler';
import reducer from './reducer';
import router from './router';

const getMiddelware = () => {
  const { middleware: routerMiddleware } = router;
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(errorHandler, routerMiddleware, thunk);
  }
  // logger for development
  return applyMiddleware(errorHandler, routerMiddleware, thunk, logger);
};

export default createStore(
  reducer,
  compose(
    router.enhancer,
    composeWithDevTools(getMiddelware()),
  ),
);
