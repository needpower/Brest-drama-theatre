import { union, unionWith, difference, differenceWith, isEqual } from 'lodash';

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
 * @typedef {Object} Character
 * @property {string} role
 * @property {number} personId
 */

/**
 * @typedef {Object} Event - New event
 * @property {number} id
 * @property {?number} ageRestrictions - People younger than this age
 * can't buy tickets for this event
 * @property {number} author - An author, director of event
 * @property {Character[]} characters - People's names who take part in event
 * @property {string} description - About event. Can include html, images
 * @property {!number} duration - How long an event will take
 * @property {?string} genre
 * @property {Hall} hall - In what hall event will be played
 * @property {number[]} gallery - photo gallery from past event
 * @property {Language} language
 * @property {number} poster - A path to cover of event
 * @property {?(number[])} price. Several prices while no online ticket sale
 * @property {Date} start - when event will start
 * @property {!string} title - Title of event
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

  /**
   *
   * @param {Character} character
   * @returns {Event} event with updated characters
   */
  const addCharacter = (character) => {
    const updatedCharacters = unionWith(event.character, character, isEqual);
    return Object.freeze({
      ...event,
      characters: updatedCharacters,
    });
  };

  /**
   *
   * @param {Character} character character to remove from event
   * @returns {Event} event with updated characters
   */
  const removeCharacter = (character) => {
    const updatedCharacters = differenceWith(event.character, character, isEqual);
    return Object.freeze({
      ...event,
      characters: updatedCharacters,
    });
  };

  return Object.freeze({
    getEvent,
    addImages,
    deleteImages,
    addCharacter,
    removeCharacter,
  });
}
