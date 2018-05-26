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
  return List(events);
};

/**
 * @param {Immutable.List} state
 * @param {Object} action
 * @param {Object} action.payload
 * @returns {Immutable.List}
 */
const createEvent = (state, action) => {
  const event = new Event(action.payload);
  return state.push(event);
};

/**
 * @param {Immutable.List} state
 * @param {Object} action
 * @param {Object} action.payload
 * @returns {Immutable.List}
 */
const updateEvent = (state, action) => {
  const eventIndex = state.findIndex(event => event.get('id') === action.payload.id);
  const event = new Event(action.payload);
  return state.set(eventIndex, event);
};

/**
 * @param {Immutable.List} state
 * @param {Object} action
 * @param {number} action.payload
 * @returns {Immutable.List}
 */
const deleteEvent = (state, action) => {
  const eventIndex = state.findIndex(event => event.get('id') === action.payload);
  return state.delete(eventIndex);
};

export default createReducer(initialState, {
  [actions.GET_EVENTS_SUCCESS]: getEvents,
  [actions.CREATE_EVENT_SUCCESS]: createEvent,
  [actions.UPDATE_EVENT_SUCCESS]: updateEvent,
  [actions.DELETE_EVENT_SUCCESS]: deleteEvent,
});
