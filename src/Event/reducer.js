import reduxCRUD from 'redux-crud';
import { find } from 'lodash';
import Event, { MODEL_NAME } from './model';
import { addImages, deleteImages } from './actions';

const CRUDreducer = reduxCRUD.List.reducersFor(MODEL_NAME);

const reducer = (state = [], action) => {
  switch (action.type) {
    case addImages: {
      const event = Event(find(state, { id: action.eventId }));
      const eventWithUpdatedImages = event.addImages(action.images);
      return [...state, ...eventWithUpdatedImages];
    }
    default:
      return CRUDreducer(state, action);
  }
};

export default reducer;
