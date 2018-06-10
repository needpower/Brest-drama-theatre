import { List } from 'immutable';
import Event from './model';
import Image from '../Image/model';
import Person from '../Person/model';
import { eventData1, eventData2 } from './__mocks__';

jest.mock('../Image/model');
jest.mock('../Person/model');
jest.mock('../Person/model');

describe('Event model', () => {
  beforeEach(() => {
    Image.mockClear();
    Person.mockClear();
  });

  it('instance created', () => {
    const event = new Event(eventData1);
    const personsAmount = eventData1.characters.length + 1; // 1 - author
    // all subitems of event were instantiated
    expect(Image).toHaveBeenCalledTimes(1);
    expect(Person).toHaveBeenCalledTimes(personsAmount);
  });

  it('data received properly', () => {
    const event = new Event(eventData1);
    // event data was received
    expect(typeof event.get('title')).toBe('string');
    expect(event.get('price')).toBeInstanceOf(List);
    expect(event.get('poster')).toBeInstanceOf(Image);
    expect(event.get('author')).toBeInstanceOf(Person);
  });

  it('fields are resettable', () => {
    const event = new Event(eventData2);
    const expectedGenre = 'Миниатюра с увертюрой';
    expect(event.set('genre', expectedGenre).get('genre')).toBe(expectedGenre);
  });
});
