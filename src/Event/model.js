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

/** Class representing an event
 *
 * @param {Object} event - New event
 * @param {?number} event.ageRestrictions - People younger than this age
 * can't buy tickets for this event
 * @param {Person} event.author - An author, director of show
 * @param {Person[]} event.characters - People names who play roles in event
 * @param {string} event.description - About event. Can include html, images
 * @param {!number} event.duration - How long an event will take
 * @param {?string} event.genre
 * @param {Hall} event.hall - In what hall event will occurs
 * @param {Image[]} images - photo gallery of this event in the past. See {@link Image}
 * @param {Language} event.language
 * @param {Image} event.poster - A path to cover of event
 * @param {?(number[])} event.price. Several prices while no online ticket sale
 * @param {Date} event.start - when event will start
 * @param {!string} event.title - Title of event
 */
export default function Event(event) {
  return Object.freeze(event);
}
