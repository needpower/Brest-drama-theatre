import { Record, List, fromJS } from 'immutable';
import Image from './Image';


const Parent = Record({
  photos: List(),
});

/** Class representing a group of photos */
export default class PhotoAlbum extends Parent {
  /**
   * Create a photo album
   *
   * @param {(Object[]|Image[])} photo
   */
  constructor(photos) {
    const imageList = photos.map(photo =>
      ((photo instanceof Image) ? photo : new Image(photo)));

    super(fromJS({ photos: imageList }));
  }
}
