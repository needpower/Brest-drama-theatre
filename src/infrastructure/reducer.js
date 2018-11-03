import characters from 'Characters/reducer';
import events from 'Events/reducer';
import images from 'Images/reducer';
import { combineReducers } from 'redux';
import ui from 'ui/reducer';
import router from './router';

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
  domain: combineReducers({
    events,
    characters,
    images,
  }),
  ui,
  location: router().reducer,
});
