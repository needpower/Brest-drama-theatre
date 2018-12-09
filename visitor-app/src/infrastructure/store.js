import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import errorHandler from './error-handler';
import reducer from './reducer';
import createRouter from './router';

export default function configureStore({ history, initialEntries, preloadedState = {} }) {
  const { enhancer, middleware: routerMiddleware, thunk: routerThunk } = createRouter({
    history,
    initialEntries,
  });
  const getMiddelware = () => {
    if (process.env.NODE_ENV === 'production') {
      return applyMiddleware(errorHandler, thunk, routerMiddleware);
    }
    // logger for development
    return applyMiddleware(errorHandler, thunk, routerMiddleware, logger);
  };

  const store = createStore(
    reducer,
    preloadedState,
    compose(
      enhancer,
      composeWithDevTools(getMiddelware()),
    ),
  );

  return { store, routerThunk };
}
