import { extend } from 'lodash';
import reduxCRUD from 'redux-crud';
import httpService from 'infrastructure/http';
import { MODEL_NAME, Person } from './model';

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

export const ADD_PHOTOS = 'ADD_PHOTOS';
export const REMOVE_PHOTOS = 'REMOVE_PHOTOS';

const personsActionCreators = {
  /**
   * @param {number[]} [ids] If not provided, all events will be fetched
   */
  get(ids = [], replaceExisting = true) {
    return (dispatch) => {
      dispatch(fetchStart());

      return getItems('getPersons', {
        params: { ids },
      })
        .then(persons => dispatch(fetchSuccess(persons, { replace: replaceExisting })))
        .catch(error => dispatch(fetchError(error)));
    };
  },

  /**
   * @param {Person} person
   */
  add(person) {
    return (dispatch) => {
      dispatch(createStart(person));

      return (
        post('addPerson', person)
          // Need to pass client generated ky for optimistic rendering,
          // i.e when created event will be returned from server,
          // we can replace temporary with saved one
          .then(addedPerson => dispatch(createSuccess(addedPerson, addedPerson.id)))
          .catch(error => dispatch(createError(error, person)))
      );
    };
  },

  addPhotos(personId, photos) {
    return {
      type: ADD_PHOTOS,
      personId,
      photos,
    };
  },

  removePhotos(personId, photos) {
    return {
      type: REMOVE_PHOTOS,
      personId,
      photos,
    };
  },

  /**
   * @param {Object} payload Part of person info that have to be updated
   */
  update(payload) {
    return (dispatch) => {
      dispatch(updateStart(payload));

      return patch('updatePerson', payload)
        .then(updatedEvent => dispatch(updateSuccess(updatedEvent)))
        .catch(error => dispatch(updateError(error, payload)));
    };
  },

  /**
   * @param {Person} person
   */
  delete(person) {
    return (dispatch) => {
      dispatch(deleteStart(person));

      return deleteItem('deleteEvent', person.id)
        .then(deletedPerson => dispatch(deleteSuccess(deletedPerson)))
        .catch(error => dispatch(deleteError(error, person)));
    };
  },
};

export default extend(baseActionCreators, personsActionCreators);
