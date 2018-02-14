import { Record, List, fromJS } from 'immutable';
import Person from './Person';


const Parent = Record({
  persons: List(),
});

/** Class representing a group of people */
export default class PersonsList extends Parent {
  /**
   * Create a group of people
   *
   * @param {(Object[]|Person[])} people
   */
  constructor(people) {
    const personsList = people.map(person =>
      ((person instanceof Person) ? person : new Person(person)));

    super(fromJS({ persons: personsList }));
  }
}
