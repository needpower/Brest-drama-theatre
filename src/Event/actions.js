import 'cross-fetch/polyfill';

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
  fetch('http://mockserver.io/sasha') // eslint-disable-line
    .then(res => res.json())
    .then(events => dispatch(getEventsSuccess(events)))
    .catch(error => dispatch(getEventsFailure(error)));

export const createEvent = 'CreateEvent';

export const updateEvent = 'updateEvent';

export const deleteEvent = 'deleteEvent';
