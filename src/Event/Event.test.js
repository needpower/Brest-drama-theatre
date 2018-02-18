import { List } from 'immutable';
import Event from './Event';
import Image from '../Image/Image';
import Person from '../Person/Person';
import PersonsList from '../Person/PersonsList';
import { eventData1, eventData2 } from './__mocks__';


jest.mock('../Image/Image');
jest.mock('../Person/Person');
jest.mock('../Person/PersonsList');

describe('Event model', () => {
  beforeEach(() => {
    Image.mockClear();
    Person.mockClear();
    PersonsList.mockClear();
  });

  it('Instance created', () => {
    const event = new Event(eventData1);
    // all subitems of event were instantiated
    expect(Image).toHaveBeenCalledTimes(1);
    expect(Person).toHaveBeenCalledTimes(1);
    expect(PersonsList).toHaveBeenCalledTimes(1);
  });

  it('Data received properly', () => {
    const event = new Event(eventData1);
    // event data was received
    expect(typeof event.get('title')).toBe('string');
    expect(event.get('price')).toBeInstanceOf(List);
    expect(event.get('poster')).toBeInstanceOf(Image);
    expect(event.get('author')).toBeInstanceOf(Person);
  });

  it('Data is resettable', () => {
    const event = new Event(eventData2);
    const expectedGenre = 'Миниатюра с увертюрой';
    expect(event.set('genre', expectedGenre).get('genre')).toBe(expectedGenre);
  });
});
