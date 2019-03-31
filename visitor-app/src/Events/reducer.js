import reduxCRUD from 'redux-crud';
import { find } from 'lodash';
import { updateItemInArray } from 'infrastructure/reducer';
import Event, { MODEL_NAME } from './model';
import {
  addImagesType, deleteImagesType, addCharacterType, removeCharacterType,
} from './actions';

const CRUDreducer = reduxCRUD.List.reducersFor(MODEL_NAME);

const reducer = (state = [], action) => {
  switch (action.type) {
    case addImagesType: {
      const id = action.eventId;
      const event = Event(find(state, { id }));
      const eventWithAddedImages = event.addImages(action.images);
      return updateItemInArray({
        source: state,
        itemId: id,
        newValue: eventWithAddedImages,
      });
    }
    case deleteImagesType: {
      const id = action.eventId;
      const event = Event(find(state, { id }));
      const eventWithRemovedImages = event.deleteImages(action.images);
      return updateItemInArray({
        source: state,
        itemId: id,
        newValue: eventWithRemovedImages,
      });
    }
    case addCharacterType: {
      const id = action.eventId;
      const event = Event(find(state, { id }));
      const eventWithAddedCharacter = event.addCharacter(action.character);
      return updateItemInArray({
        source: state,
        itemId: id,
        newValue: eventWithAddedCharacter,
      });
    }
    case removeCharacterType: {
      const id = action.eventId;
      const event = Event(find(state, { id }));
      const eventWithRemovedCharacter = event.removeCharacter(action.character);
      return updateItemInArray({
        source: state,
        itemId: id,
        newValue: eventWithRemovedCharacter,
      });
    }
    default:
      return CRUDreducer(state, action);
  }
};

export default reducer;
