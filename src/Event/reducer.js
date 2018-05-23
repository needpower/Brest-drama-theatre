import { createReducer } from 'redux-create-reducer';
import { List } from 'immutable';
import Event from './model';
import * as actions from './actions';

const initialState = List();

/**
 * @param {Immutable.List} state
 * @param {Object} action
 * @param {Array} action.payload list of events
 * @returns {Immutable.List}
 */
const getEvents = (state, action) => {
  const events = action.payload.map(event => new Event(event));
  return state.push(...events);
};

export default createReducer(initialState, {
  [actions.GET_EVENTS_SUCCESS]: getEvents,
});
