import reduxCRUD from 'redux-crud';
import { find } from 'lodash';
import Event, { MODEL_NAME } from './model';
import { addImagesType, deleteImagesType } from './actions';
import { updateItemInArray } from '../infrastructure/reducer';

const CRUDreducer = reduxCRUD.List.reducersFor(MODEL_NAME);

const reducer = (state = [], action) => {
  switch (action.type) {
    case addImagesType: {
      const id = action.eventId;
      const event = Event(find(state, { id }));
      const eventWithAddedImages = event.addImages(action.images);
      return updateItemInArray({
        destination: state,
        itemId: id,
        newValue: eventWithAddedImages,
      });
    }
    case deleteImagesType: {
      const id = action.eventId;
      const event = Event(find(state, { id }));
      const eventWithRemovedImages = event.deleteImages(action.images);
      return updateItemInArray({
        destination: state,
        itemId: id,
        newValue: eventWithRemovedImages,
      });
    }
    default:
      return CRUDreducer(state, action);
  }
};

export default reducer;
