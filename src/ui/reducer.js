import { combineReducers } from 'redux';
import errors from 'infrastructure/error-handler/reducer';
import page from './Page/reducer';

export default combineReducers({
  errors,
  page,
});
