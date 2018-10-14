import eventsActions from 'Events/actions';
import { find } from 'lodash';
import { NOT_FOUND } from 'redux-first-router';

const notFound = () => ({
  type: NOT_FOUND,
});

const routesMap = {
  EVENTS_LIST: {
    path: '/',
    thunk: async dispatch => dispatch(eventsActions.get()),
  },
  EVENT: {
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
};

export default routesMap;
