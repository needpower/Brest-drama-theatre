import createHistory from 'history/createBrowserHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './store';

const createSelectLocationState = () => state => ({
  locationBeforeTransitions: state.get('routing').get('locationBeforeTransitions'),
});

const history = syncHistoryWithStore(createHistory(), store, {
  selectLocationState: createSelectLocationState(),
});

export default history;
