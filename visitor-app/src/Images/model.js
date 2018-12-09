/**
 * @typedef {Object} Image
 * @property {number} height
 * @property {string} path
 * @property {number} size in KB
 * @property {number} width
 * @property {?string} desciption
 */

export const MODEL_NAME = 'images';

export const defaultImage = {
  id: 100000,
  path: '/posters/placeholder.png',
  height: 800,
  weight: 0.6,
  width: 800,
};

/**
 * Class representing a single image
 * @param {Image} image
 */
export default function Image(image) {
  // TODO: replace with real model (getters, setters, etc.)
  return Object.freeze(image);
}
