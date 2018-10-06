import { combineReducers } from 'redux';
import errors from 'infrastructure/error-handler/reducer';

export default combineReducers({
  errors,
});
