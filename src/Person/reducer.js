import reduxCRUD from 'redux-crud';
import { find } from 'lodash';
import { updateItemInArray } from 'infrastructure/reducer';
import Person, { MODEL_NAME } from './model';
import { addPhotosType, removePhotosType } from './actions';

const CRUDreducer = reduxCRUD.List.reducersFor(MODEL_NAME);

export default function reducer(state = [], action) {
  switch (action.type) {
    case addPhotosType: {
      const person = Person(find(state, { id: action.personId }));
      // TODO: add error protection: if such preson not found
      const personWithAddedPhotos = person.addPhotos(action.photos);
      return updateItemInArray({
        destination: state,
        itemId: action.personId,
        newValue: personWithAddedPhotos,
      });
    }

    case removePhotosType: {
      const person = Person(find(state, { id: action.personId }));
      // TODO: add error protection: if such preson not found
      const personWithRemovedPhotos = person.removePhotos(action.photos);
      return updateItemInArray({
        destination: state,
        itemId: action.personId,
        newValue: personWithRemovedPhotos,
      });
    }

    default:
      return CRUDreducer(state, action);
  }
}
