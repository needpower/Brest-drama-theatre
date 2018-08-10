/**
 * @typedef {Object} Image
 * @property {number} height
 * @property {string} path
 * @property {number} size in KB
 * @property {number} width
 * @property {?string} desciption
 */

export const MODEL_NAME = 'images';

/**
 * Class representing a single image
 * @param {Image} image
 */
export default function Image(image) {
  return Object.freeze(image);
}
