import { combineReducers } from 'redux-immutable';
import routerReducer from './router-reducer';
import events from '../Event/reducer';

export default combineReducers({
  events,
  routing: routerReducer,
});
