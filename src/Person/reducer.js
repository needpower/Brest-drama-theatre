import reduxCRUD from 'redux-crud';
import { find } from 'lodash';
import { updateItemInArray } from '../infrastructure/reducer';
import Person, { MODEL_NAME } from './model';
import { ADD_PHOTOS, REMOVE_PHOTOS } from './actions';

const CRUDreducer = reduxCRUD.List.reducersFor(MODEL_NAME);

export default function reducer(state = [], action) {
  switch (action.type) {
    case ADD_PHOTOS: {
      const person = Person(find(state, { id: action.personId }));
      // @TODO add error protection: if such preson not found
      const personWithAddedPhotos = person.addPhotos(action.photos);
      return updateItemInArray(state, action.personId, personWithAddedPhotos);
    }

    case REMOVE_PHOTOS: {
      const person = Person(find(state, { id: action.personId }));
      // @TODO add error protection: if such preson not found
      const personWithRemovedPhotos = person.removePhotos(action.photos);
      return updateItemInArray(state, action.personId, personWithRemovedPhotos);
    }

    default:
      return CRUDreducer(state, action);
  }
}
