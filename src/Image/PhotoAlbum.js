import { Record, List, fromJS } from 'immutable';
import Image from './model';

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
    const validatedPhotos = photos || [];
    const imageList = validatedPhotos.map(photo => (photo instanceof Image ? photo : new Image(photo)),);

    super(fromJS({ photos: imageList }));
  }
}
