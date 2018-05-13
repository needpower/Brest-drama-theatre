import { fromJS } from 'immutable';
import fetch from 'cross-fetch';

export const GET_EVENTS_SUCCESS = 'GetEventsSuccess';
export const getEventsSuccess = events => ({
  type: GET_EVENTS_SUCCESS,
  payload: fromJS(events),
});

export const GET_EVENTS_FAILURE = 'GetEventsFailure';
export const getEventsFailure = error => ({
  type: GET_EVENTS_FAILURE,
  payload: fromJS(error),
});

export const getEvents = () => dispatch => fetch('/getEvents')
  .then(res => res.json)
  .then(events => dispatch(getEventsSuccess(events)))
  .catch(error => dispatch(getEventsFailure(error)));
