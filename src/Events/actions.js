import { extend } from 'lodash';
import reduxCRUD from 'redux-crud';
import httpService from 'infrastructure/http';
import { MODEL_NAME, Character } from './model';

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
const ACTION_MODEL = MODEL_NAME.toUpperCase();
export const addImagesType = `${ACTION_MODEL}_ADD_IMAGES`;
export const deleteImagesType = `${ACTION_MODEL}_DELETE_IMAGES`;
export const addCharacterType = `${ACTION_MODEL}_ADD_CHARACTER`;
export const removeCharacterType = `${ACTION_MODEL}_REMOVE_CHARACTER`;

const eventsActionCreators = {
  /**
   * @param {number[]} [ids] If not provided, all events will be fetched
   */
  get(ids = [], replaceExisting = true) {
    return (dispatch) => {
      dispatch(fetchStart());

      return getItems('events', {
        params: { ids },
      })
        .then(events => dispatch(fetchSuccess(events.data, { replace: replaceExisting })))
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
   * @param {Character} character id of a character
   */
  addCharacter(eventId, character) {
    return {
      type: addCharacterType,
      eventId,
      character,
    };
  },

  /**
   * @param {number} eventId
   * @param {Character} character id of a character
   */
  removeCharacter(eventId, character) {
    return {
      type: removeCharacterType,
      eventId,
      character,
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
