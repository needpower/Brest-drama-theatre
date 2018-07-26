export const MODEL_NAME = 'events';

/** Class representing an event
 *
 * @param {Object} event - New event
 * @param {?number} event.ageRestrictions - People younger than this age
 * can't buy tickets for this event
 * @param {string} event.author - An author, director of show
 * @param {string[]} event.characters - People names who play roles in event
 * @param {string} event.description - About event. Can include html, images
 * @param {!number} event.duration - How long an event will take
 * @param {?string} event.genre
 * @param {string} event.hall - In what hall event will occurs
 * @param {string} event.language
 * @param {string} event.poster - A path to cover of event
 * @param {?(number[])} event.price. Several prices while no online ticket sale
 * @param {Date} event.start - when event will start
 * @param {!string} event.title - Title of event
 */
export default function Event(event) {
  return Object.freeze({});
}
