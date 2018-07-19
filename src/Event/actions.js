import { get, post, put, deleteItem } from '../infrastructure/http';

export const GET_EVENTS_SUCCESS = 'GetEventsSuccess';
export const getEventsSuccess = events => ({
  type: GET_EVENTS_SUCCESS,
  payload: events,
});

export const GET_EVENTS_FAILURE = 'GetEventsFailure';
export const getEventsFailure = error => ({
  type: GET_EVENTS_FAILURE,
  payload: error,
});

export const getEvents = () => dispatch =>
  get('getEvents')
    .then(events => dispatch(getEventsSuccess(events)))
    .catch(error => dispatch(getEventsFailure(error)));

export const CREATE_EVENT_SUCCESS = 'CreateEventSuccess';
export const createEventSuccess = event => ({
  type: CREATE_EVENT_SUCCESS,
  payload: event,
});

export const CREATE_EVENT_FAILURE = 'createEventFailure';
export const createEventFailure = error => ({
  type: CREATE_EVENT_FAILURE,
  payload: error,
});

export const createEvent = event => dispatch =>
  post('createEvent', event)
    .then(createdEvent => dispatch(createEventSuccess(createdEvent)))
    .catch(error => dispatch(createEventFailure(error)));

export const UPDATE_EVENT_SUCCESS = 'updateEventSuccess';
export const updateEventSuccess = event => ({
  type: UPDATE_EVENT_SUCCESS,
  payload: event,
});

export const UPDATE_EVENT_FAILURE = 'updateEventFailure';
export const updateEventFailure = error => ({
  type: UPDATE_EVENT_FAILURE,
  payload: error,
});

export const updateEvent = event => dispatch =>
  put('updateEvent', event)
    .then(updatedEvent => dispatch(updateEventSuccess(updatedEvent)))
    .catch(error => dispatch(updateEventFailure(error)));

export const DELETE_EVENT_SUCCESS = 'deleteEventSuccess';
export const deleteEventSuccess = eventId => ({
  type: DELETE_EVENT_SUCCESS,
  payload: eventId,
});

export const DELETE_EVENT_FAILURE = 'deleteEventFailure';
export const deleteEventFailure = error => ({
  type: DELETE_EVENT_FAILURE,
  payload: error,
});

export const deleteEvent = eventId => dispatch =>
  deleteItem('deleteEvent', eventId)
    .then(deletedEventId => dispatch(deleteEventSuccess(deletedEventId)))
    .catch(error => dispatch(deleteEventFailure(error)));
