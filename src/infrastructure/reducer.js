import { combineReducers } from 'redux';
import events from '../Event/reducer';

/**
 * @param {Array} destination state
 * @param {number} itemId item to update
 * @param {Object} newValue a data which item will be updated
 * @returns {Array} updated state
 */
export const updateItemInArray = ({ destination, itemId, newValue }) => {
  const updatedItems = destination.map((item) => {
    if (item.id !== itemId) {
      // Since we only want to update one item, preserve all others that not match
      return item;
    }
    const updatedItem = Object.assign({}, item, newValue);
    return updatedItem;
  });

  return updatedItems;
};

export default combineReducers({
  events,
});
