/**
 * @typedef {Object} Person
 * @property {?string} about Biography, few words about person
 * @property {!string} name
 * @property {number[]} photos A to person's photos ids
 */

export const MODEL_NAME = 'persons';

/** Class representing a theatre worker */
export default function Person(person) {
  return Object.freeze(person);
}
