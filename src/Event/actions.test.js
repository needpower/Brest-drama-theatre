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

  it('should fetch all events', () => {
    const expectedEvents = [eventData1, eventData2];
    axios.get.mockImplementation(() => Promise.resolve(expectedEvents));

    const expectedActions = [
      {
        type: actions.GET_EVENTS_SUCCESS,
        payload: expectedEvents,
      },
    ];
    return store.dispatch(actions.getEvents()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
