import axios from 'axios';
import mockStore from '../infrastructure/mockStore';
import * as actions from './actions';
import { eventData1, eventData2 } from './__mocks__';

jest.mock('axios');
describe('Event actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({ events: [] });
  });

  it('fetch all events', () => {
    const expectedEvents = [eventData1, eventData2];
    axios.get.mockImplementation(() => Promise.resolve(expectedEvents));

    const expectedActions = [actions.getEventsSuccess(expectedEvents)];
    return store.dispatch(actions.getEvents()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('create event', () => {
    axios.post.mockImplementation(() => Promise.resolve(eventData1));
    const expectedActions = [actions.createEventSuccess(eventData1)];

    return store.dispatch(actions.createEvent(eventData1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('update event', () => {
    axios.put.mockImplementation(() => Promise.resolve(eventData2));
    const expectedActions = [actions.updateEventSuccess(eventData2)];

    return store.dispatch(actions.updateEvent(eventData1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('delete event', () => {
    const eventIdToDelete = eventData1.id;
    const expectedActions = [actions.deleteEventSuccess(eventIdToDelete)];
    axios.delete.mockImplementation(() => Promise.resolve(eventIdToDelete));

    return store.dispatch(actions.deleteEvent(eventIdToDelete)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
