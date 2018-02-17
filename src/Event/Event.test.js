import Event from './Event';
import Image from '../Image/Image';
import Person from '../Person/Person';
import PersonsList from '../Person/PersonsList';
import { eventData1 } from './__mocks__';


jest.mock('../Image/Image');
jest.mock('../Person/Person');
jest.mock('../Person/PersonsList');

describe('Event model', () => {
  beforeEach(() => {
    Image.mockClear();
    Person.mockClear();
    PersonsList.mockClear();
  });

  it('Event instance created', () => {
    const event = new Event(eventData1);
    // all subitems of event were instantiated
    expect(Image).toHaveBeenCalledTimes(1);
    expect(Person).toHaveBeenCalledTimes(1);
    expect(PersonsList).toHaveBeenCalledTimes(1);
    // event data was received
    expect(typeof event.get('title')).toBe('string');
    expect(event.get('title')).toBeGreaterThan(0);
  });
});
