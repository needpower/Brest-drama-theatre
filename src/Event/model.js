import { union, difference } from 'lodash';

/**
 * @typedef Language
 * @property {string} English "english"
 * @property {string} Russian "russian"
 * @property {string} Belarussian "belarusian"
 */

/**
 * @typedef Hall
 * @property {string} Large "large"
 * @property {string} Small "small"
 */

/**
 * @typedef {Object} Event - New event
 * @property {number} id
 * @property {?number} event.ageRestrictions - People younger than this age
 * can't buy tickets for this event
 * @property {Person} event.author - An author, director of show
 * @property {Person[]} event.characters - People names who play roles in event
 * @property {string} event.description - About event. Can include html, images
 * @property {!number} event.duration - How long an event will take
 * @property {?string} event.genre
 * @property {Hall} event.hall - In what hall event will be played
 * @property {number[]} gallery - photo gallery from past event
 * @property {Language} event.language
 * @property {Image} event.poster - A path to cover of event
 * @property {?(number[])} event.price. Several prices while no online ticket sale
 * @property {Date} event.start - when event will start
 * @property {!string} event.title - Title of event
 */

export const MODEL_NAME = 'events';

/** Class representing an event
 *
 * @param {Event} event
 */
export default function Event(event) {
  const getEvent = () => Object.freeze(event);

  /**
   * @param {number[]} images list of images to attach to event
   * @returns {Event} updated event
   */
  const addImages = (images) => {
    const updatedImages = union(event.gallery, images);
    return Object.freeze({
      ...event,
      gallery: updatedImages,
    });
  };

  /**
   * @param {number[]} images list of images that have to be deleted
   * @returns {Event} updated event
   */
  const deleteImages = (images) => {
    const updatedImages = difference(event.gallery, images);
    return Object.freeze({
      ...event,
      gallery: updatedImages,
    });
  };

  return Object.freeze({ getEvent, addImages, deleteImages });
}
