import cuid from 'cuid';
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
      const cid = cuid();
      // Add new event to store before we get a real created one from server (optimistic creation)
      const newEvent = {
        ...event,
        id: cid,
      };

      dispatch(createStart(newEvent));

      return post('createEvent', newEvent)
        .then(createdEvent => dispatch(createSuccess(createdEvent, cid)))
        .catch(error => dispatch(createError(error, event)));
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

  delete(eventId) {
    return (dispatch) => {
      dispatch(deleteStart(eventId));

      return deleteItem('deleteEvent', eventId)
        .then(deletedEvent => dispatch(deleteSuccess(deletedEvent)))
        .catch(error => dispatch(deleteError(error, eventId)));
    };
  },
};

export default _.extend(baseActionCreators, eventsActionCreators);
