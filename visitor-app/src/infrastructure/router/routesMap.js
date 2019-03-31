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
    thunk: async dispatch => dispatch(eventsActions.get())
      .then(() => changeTitle())
      .catch((error) => {
        throw new Error(error);
      }),
  },
  [routes.EVENT]: {
    path: '/events/:id',
    coerceNumbers: true,
    thunk: async (dispatch, getState) => {
      const { id } = getState().location.payload;
      return dispatch(eventsActions.getOne(id))
        .then(() => {
          const currentEvent = getState().domain.events.find(
            event => event.id === getState().location.payload.id,
          );
          changeTitle(currentEvent.title);
        })
        .catch((error) => {
          throw new Error(error);
        });
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

function changeTitle(newTitle) {
  const defaultTitle = 'Брестский академический театр драмы';
  if (!newTitle) {
    document.title = defaultTitle;
  } else {
    document.title = `${newTitle} \u2013 ${defaultTitle}`;
  }
}

export default routesMap;
