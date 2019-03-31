import { createSelector } from 'reselect';

const getEvents = state => state.domain.events;

export const getMainEvents = createSelector(
  [getEvents],
  events => events.filter(event => event.isMainEvent),
);

export const getOtherEvents = createSelector(
  [getEvents],
  events => events.filter(event => !event.isMainEvent),
);

export const getEvent = eventId => createSelector(
  [getEvents],
  events => events.find(event => event.id === eventId),
);
