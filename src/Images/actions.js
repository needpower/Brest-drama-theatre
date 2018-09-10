import { extend } from 'lodash';
import reduxCRUD from 'redux-crud';
import httpService from 'infrastructure/http';
import { MODEL_NAME, Image } from './model';

const baseActionCreators = reduxCRUD.actionCreatorsFor(MODEL_NAME);
const { deleteItem, get: getItems, post } = httpService;

const {
  fetchStart,
  fetchSuccess,
  fetchError,
  createStart,
  createSuccess,
  createError,
  deleteStart,
  deleteSuccess,
  deleteError,
} = baseActionCreators;

const imagesActionCreators = {
  /**
   * @param {number[]} [ids] If not provided, all events will be fetched
   */
  get(ids = [], replaceExisting = true) {
    return (dispatch) => {
      dispatch(fetchStart());

      return getItems('getImages', {
        params: { ids },
      })
        .then(images => dispatch(fetchSuccess(images, { replace: replaceExisting })))
        .catch(error => dispatch(fetchError(error)));
    };
  },

  /**
   * @param {Image} image
   */
  upload(image) {
    return (dispatch) => {
      dispatch(createStart(image));

      return (
        post('uploadImage', image)
          // Need to pass client generated ky for optimistic rendering,
          // i.e when created event will be returned from server,
          // we can replace temporary with saved one
          .then(uploadedImage => dispatch(createSuccess(uploadedImage, uploadedImage.id)))
          .catch(error => dispatch(createError(error, image)))
      );
    };
  },

  /**
   * @param {Image} image
   */
  delete(image) {
    return (dispatch) => {
      dispatch(deleteStart(image));

      return deleteItem('deleteEvent', image.id)
        .then(deletedImage => dispatch(deleteSuccess(deletedImage)))
        .catch(error => dispatch(deleteError(error, image)));
    };
  },
};

export default extend(baseActionCreators, imagesActionCreators);
