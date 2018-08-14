import { combineReducers } from 'redux';
import routerReducer from './router-reducer';
import events from '../Event/reducer';

/**
 * @param {Array} array state
 * @param {number} itemId item to update
 * @param {Object} newValues a way to update item
 */
export const updateItemInArray = (array, itemId, newValues) => {
  const updatedItems = array.map((item) => {
    if (item.id !== itemId) {
      // Since we only want to update one item, preserve all others that not match
      return item;
    }
    const updatedItem = Object.assign({}, item, newValues);
    return updatedItem;
  });

  return updatedItems;
};

export default combineReducers({
  events,
  routing: routerReducer,
});
