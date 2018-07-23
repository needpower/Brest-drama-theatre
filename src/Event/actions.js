import cuid from 'cuid';
import _ from 'lodash';
import reduxCRUD from 'redux-crud';
import { deleteItem, get, patch, post } from '../infrastructure/http';
import TheatreEvent from './model';

const baseActionCreators = reduxCRUD.actionCreatorsFor('events');

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
  get(ids, replaceExisting = true) {
    return (dispatch) => {
      dispatch(fetchStart());

      return get('getEvents', ids)
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

  update(event) {
    return (dispatch) => {
      dispatch(updateStart(event));

      return patch('updateEvent', event)
        .then(updatedEvent => dispatch(updateSuccess(updatedEvent)))
        .catch(error => dispatch(updateError(error, event)));
    };
  },

  delete(event) {
    return (dispatch) => {
      dispatch(deleteStart(event));

      return deleteItem('deleteEvent', event)
        .then(updatedEvent => dispatch(deleteSuccess(updatedEvent)))
        .catch(error => dispatch(deleteError(error, event)));
    };
  },
};

export default _.extend(baseActionCreators, eventsActionCreators);
