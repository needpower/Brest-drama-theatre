import { List, Record } from 'immutable';
import PhotoAlbum from '../Image/PhotoAlbum';


const Parent = Record({
  about: null, // can include html, images. Must be like html container
  name: '',
  photos: new PhotoAlbum(),
  roles: List(), // can be director, producer or writer at the same time ?
});

export default class Person extends Parent {

}
