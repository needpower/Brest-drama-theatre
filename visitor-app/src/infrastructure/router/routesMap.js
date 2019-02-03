import eventsActions from 'Events/actions';
import { NOT_FOUND } from 'redux-first-router';

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
    thunk: async (dispatch, getState) => dispatch(eventsActions.get())
      .then(() => {
        const mainEventsPosters = getState()
          .domain.events.filter(event => event.isMainEvent)
          .map(mainEvent => mainEvent.poster);
        return mainEventsPosters;
      })
    // .then(mainEventsPosters => dispatch(imagesActions.get(mainEventsPosters)))
      .catch((error) => {
        throw new Error(error);
      }),
  },
  [routes.EVENT]: {
    path: '/events/:id',
    coerceNumbers: true,
    thunk: async (dispatch, getState) => {
      const { id } = getState().location.payload;
      return dispatch(eventsActions.getOne(id));
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

function notFound() {
  return {
    type: NOT_FOUND,
  };
}

export default routesMap;
