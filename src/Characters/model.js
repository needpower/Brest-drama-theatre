import { union, difference } from 'lodash';

/**
 * @typedef {Object} Character
 * @property {?string} about Biography, few words about person
 * @property {!string} name
 * @property {number[]} photos A to person's photos ids
 */

export const MODEL_NAME = 'characters';

/** Class representing a theatre worker
 *
 * @param {Person} person
 */
export default function Character(person) {
  const getPerson = () => Object.freeze(person);

  /**
   * @param {number[]} photos ids to add
   * @returns {Person} updated person
   */
  const addPhotos = (photos) => {
    const updatedPhotos = union(person.photos, photos);
    return Object.freeze({
      ...person,
      photos: updatedPhotos,
    });
  };

  /**
   * @param {number[]} photos ids to remove
   * @returns {Person} updated person
   */
  const removePhotos = (photos) => {
    const updatedPhotos = difference(person.photos, photos);
    return Object.freeze({
      ...person,
      photos: updatedPhotos,
    });
  };

  return Object.freeze({
    getPerson,
    addPhotos,
    removePhotos,
  });
}
