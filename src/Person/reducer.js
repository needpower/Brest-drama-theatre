import reduxCRUD from 'redux-crud';
import { find } from 'lodash';
import Person, { MODEL_NAME } from './model';
import { ADD_PHOTOS, REMOVE_PHOTOS } from './actions';

const CRUDreducer = reduxCRUD.List.reducersFor(MODEL_NAME);

export default function reducer(state = [], action) {
  switch (action.type) {
    case ADD_PHOTOS: {
      const person = Person(find(state, { id: action.personId }));
      const personWithAddedPhotos = person.addPhotos(action.photos);
    }

    default:
      return CRUDreducer(state, action);
  }
}
