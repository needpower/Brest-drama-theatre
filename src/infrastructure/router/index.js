import createHistory from 'history/createBrowserHistory';
import { connectRoutes } from 'redux-first-router';
import routesMap from './routesMap';

export default function createRouter({ history = createHistory, initialEntries = '' } = {}) {
  return connectRoutes(routesMap, {
    createHistory: history,
    initialEntries,
  });
}
