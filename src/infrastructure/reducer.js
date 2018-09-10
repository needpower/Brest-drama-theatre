import { combineReducers } from 'redux';
import events from 'Events/reducer';
import characters from 'Characters/reducer';
import images from 'Images/reducer';

/**
 * @param {Array} source state
 * @param {number} itemId item to update
 * @param {Object} newValue a data which item will be updated
 * @returns {Array} updated state
 */
export const updateItemInArray = ({ source, itemId, newValue }) => {
  const updatedItems = source.map((item) => {
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
  characters,
  images,
});
