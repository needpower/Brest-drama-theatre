import { Image } from '../Image/model';
import { Person } from '../Person/model';

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
 * @property {?number} event.ageRestrictions - People younger than this age
 * can't buy tickets for this event
 * @property {Person} event.author - An author, director of show
 * @property {Person[]} event.characters - People names who play roles in event
 * @property {string} event.description - About event. Can include html, images
 * @property {!number} event.duration - How long an event will take
 * @property {?string} event.genre
 * @property {Hall} event.hall - In what hall event will occurs
 * @property {Image[]} images - photo gallery of this event in the past. See {@link Image}
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
  return Object.freeze(event);
}
