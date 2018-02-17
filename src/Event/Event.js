import { Record, fromJS } from 'immutable';
import Image from '../Image/Image';
import Person from '../Person/Person';
import PersonsList from '../Person/PersonsList';
import { dateToHumanFriendlyFormat } from './utils';


const Parent = Record({
  ageRestrictions: null,
  author: new Person(),
  characters: new PersonsList(),
  description: null, // can include html, images. Must be like html container
  duration: 0, // minutes
  genre: null,
  hall: 'big', // big | small (anything else?). Enum type
  language: 'ru', // ru | en | by (anything else?)
  poster: new Image(),
  price: 0, // BYN
  start: new Date(),
  title: '',
});

/** Class representing an event */
export default class Event extends Parent {
  /**
   * Create an event
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
   * @param {?(number|number[])} event.price. Several prices if no online ticket sale
   * @param {Date} event.start - when event will start
   * @param {!string} event.title - Title of event
   */
  constructor(event) {
    const startDate = dateToHumanFriendlyFormat(event.start);
    const poster = new Image(event.poster);
    const actors = new PersonsList(event.actors);
    const author = new Person(event.author);

    const immutableEvent = fromJS(Object.assign({}, event, {
      start: startDate,
      poster,
      actors,
      author,
    }));
    super(immutableEvent);
  }
}
