import { List, Record, fromJS } from 'immutable';
import PhotoAlbum from '../Image/PhotoAlbum';


const Parent = Record({
  about: null, // can include html, images. Must be like html container
  name: '',
  photos: new PhotoAlbum(),
  roles: List(), // can be director, producer and writer at the same time? Or just one role?
});

/** Class representing a theatre worker */
export default class Person extends Parent {
  /**
   * Create person
   *
   * @param {Object} person - Who should be created
   * @param {?string} person.about - Biography, few words about person
   * @param {!string} person.name
   * @param {string[]} person.photos - A path to person's photos
   * @param {string[]} person.roles - What person can do in theatre (actor, writer, etc)
   */
  constructor(person) {
    const photos = new PhotoAlbum(person.photos);
    const roles = List(person.roles);
    const immutablePerson = fromJS(Object.assign({}, person, {
      photos,
      roles,
    }));

    super(immutablePerson);
  }
}
