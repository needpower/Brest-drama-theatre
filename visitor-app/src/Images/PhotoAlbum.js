/**
 * @typedef {Object} PhotoAlbum
 * @property {Image[]} imagesList
 * @property {Date} created a date of album's creation
 * @property {string} description about album, e.g. what event it is related to
 */

/**
 * Class representing photos that grouped by name, description
 * @param {PhotoAlbum} imagesList
 */
export default function PhotoAlbum(photoAlbum) {
  return Object.freeze(photoAlbum);
}
