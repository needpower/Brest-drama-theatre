import { Record, fromJS } from 'immutable';


const Parent = Record({
  hieght: null, // expected in px
  path: '', // TODO: use default image if no image was provided
  weight: null, // expected in Kb
  width: null, // expected in px
});

/** Class representing a single image */
export default class Image extends Parent {
  /**
   * Creates an image
   *
   * @param {Object} image
   * @param {number} image.height
   * @param {string} image.path - a path to image where it's stored
   * @param {number} image.weight
   * @param {number} image.width
   */
  constructor(image) {
    super(fromJS(image));
  }
}
