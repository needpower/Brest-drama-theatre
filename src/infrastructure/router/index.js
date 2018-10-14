import createHistory from 'history/createBrowserHistory';
import { connectRoutes } from 'redux-first-router';
import routesMap from './routesMap';

export default connectRoutes(routesMap, {
  createHistory,
});
