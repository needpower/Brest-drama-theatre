import { Image } from '../Image/model';

/**
 * @typedef {Object} Person
 * @property {?string} about Biography, few words about person
 * @property {!string} name
 * @property {Image[]} photos A path to person's photos. See {@link Image}
 * @property {string[]} roles What person can do in theatre (actor, writer, etc)
 */

/** Class representing a theatre worker */
export default function Person(person) {
  return Object.freeze(person);
}
