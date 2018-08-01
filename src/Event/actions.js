import _ from 'lodash';
import reduxCRUD from 'redux-crud';
import httpService from '../infrastructure/http';
import TheatreEvent, { MODEL_NAME } from './model';

const baseActionCreators = reduxCRUD.actionCreatorsFor(MODEL_NAME);
const {
  deleteItem, get: getItems, patch, post,
} = httpService;

const {
  fetchStart,
  fetchSuccess,
  fetchError,
  createStart,
  createSuccess,
  createError,
  updateStart,
  updateSuccess,
  updateError,
  deleteStart,
  deleteSuccess,
  deleteError,
} = baseActionCreators;

const eventsActionCreators = {
  /**
   * @param {number[]} [ids] If not provided, all events will be fetched
   */
  get(ids = [], replaceExisting = true) {
    return (dispatch) => {
      dispatch(fetchStart());

      return getItems('getEvents', {
        params: { ids },
      })
        .then(events => dispatch(fetchSuccess(events, { replace: replaceExisting })))
        .catch(error => dispatch(fetchError(error)));
    };
  },

  /**
   * @param {TheatreEvent} event
   */
  create(event) {
    return (dispatch) => {
      dispatch(createStart(event));

      return (
        post('createEvent', event)
          // Need to pass client generated ky for optimistic rendering,
          // i.e when created event will be returned from server, we can replace temporary with saved one
          .then(createdEvent => dispatch(createSuccess(createdEvent, createdEvent.id)))
          .catch(error => dispatch(createError(error, event)))
      );
    };
  },

  update(payload) {
    return (dispatch) => {
      dispatch(updateStart(payload));

      return patch('updateEvent', payload)
        .then(updatedEvent => dispatch(updateSuccess(updatedEvent)))
        .catch(error => dispatch(updateError(error, payload)));
    };
  },

  delete(event) {
    return (dispatch) => {
      dispatch(deleteStart(event));

      return deleteItem('deleteEvent', event.id)
        .then(deletedEvent => dispatch(deleteSuccess(deletedEvent)))
        .catch(error => dispatch(deleteError(error, event)));
    };
  },
};

export default _.extend(baseActionCreators, eventsActionCreators);
