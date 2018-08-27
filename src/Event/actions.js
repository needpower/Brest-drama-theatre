import { extend } from 'lodash';
import reduxCRUD from 'redux-crud';
import httpService from '../infrastructure/http';
import { MODEL_NAME } from './model';

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
export const addImagesType = 'EVENTS_ADD_IMAGES';
export const deleteImagesType = 'EVENTS_DELETE_IMAGES';
export const addPersonType = 'EVENTS_ADD_PERSON';
export const deletePersonType = 'EVENTS_DELETE_PERSON';

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
   * @param {Event} event
   */
  create(event) {
    return (dispatch) => {
      dispatch(createStart(event));

      return (
        post('createEvent', event)
          // Need to pass client generated ky for optimistic rendering,
          // i.e when created event will be returned from server,
          // we can replace temporary with saved one
          .then(createdEvent => dispatch(createSuccess(createdEvent, createdEvent.id)))
          .catch(error => dispatch(createError(error, event)))
      );
    };
  },

  /**
   * @param {Object} payload Part of event that have to be updated
   */
  update(payload) {
    return (dispatch) => {
      dispatch(updateStart(payload));

      return patch('updateEvent', payload)
        .then(updatedEvent => dispatch(updateSuccess(updatedEvent)))
        .catch(error => dispatch(updateError(error, payload)));
    };
  },

  /**
   * @param {number} eventId
   * @param {number[]} images list of images to attach to event
   */
  addImages(eventId, images) {
    return {
      type: addImagesType,
      eventId,
      images,
    };
  },

  /**
   * @param {number} eventId
   * @param {number[]} images list of images that have to be deleted
   */
  deleteImages(eventId, images) {
    return {
      type: deleteImagesType,
      eventId,
      images,
    };
  },

  /**
   * @param {number} eventId
   * @param {number} person id of a person
   */
  addPerson(eventId, person) {
    return {
      type: addPersonType,
      eventId,
      person,
    };
  },

  /**
   * @param {number} eventId
   * @param {number} person id of a person
   */
  deletePerson(eventId, person) {
    return {
      type: deletePersonType,
      eventId,
      person,
    };
  },

  /**
   * @param {Event} event
   */
  delete(event) {
    return (dispatch) => {
      dispatch(deleteStart(event));

      return deleteItem('deleteEvent', event.id)
        .then(deletedEvent => dispatch(deleteSuccess(deletedEvent)))
        .catch(error => dispatch(deleteError(error, event)));
    };
  },
};

export default extend(baseActionCreators, eventsActionCreators);
