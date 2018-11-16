import eventsActions from 'Events/actions';
import { find } from 'lodash';
import { NOT_FOUND } from 'redux-first-router';

const notFound = () => ({
  type: NOT_FOUND,
});

export const routes = {
  EVENTS_LIST: 'EVENTS_LIST',
  EVENT: 'EVENT',
  CHARACTERS: 'CHARACTERS',
  CONTACTS: 'CONTACTS',
  SEARCH: 'SEARCH',
};

const routesMap = {
  [routes.EVENTS_LIST]: {
    path: '/',
    thunk: async dispatch => dispatch(eventsActions.get()),
  },
  [routes.EVENT]: {
    path: '/events/:id',
    coerceNumbers: true,
    thunk: async (dispatch, getState) => {
      const {
        location: {
          payload: { id },
        },
        events,
      } = getState();

      if (!find(events, { id })) {
        return dispatch(notFound());
      }

      return dispatch(eventsActions.get([id]));
    },
  },
  [routes.CHARACTERS]: {
    path: '/characters',
  },
  [routes.CONTACTS]: {
    path: '/contacts',
  },
  [routes.SEARCH]: {
    path: '/search',
  },
};

export default routesMap;
