import { createBrowserHistory } from 'history';
import { connectRoutes } from 'redux-first-router';
import routesMap from './routesMap';

export default function createRouter({ history = createBrowserHistory, initialEntries = '' } = {}) {
  return connectRoutes(routesMap, {
    createBrowserHistory: history,
    initialEntries,
    title: state => state.title,
  });
}

const history = createBrowserHistory();
export function goBack() {
  history.goBack();
}
