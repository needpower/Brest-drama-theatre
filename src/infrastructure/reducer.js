import { combineReducers } from 'redux-immutable';
import events from '../Event/reducer';

export default combineReducers({
  events,
});
