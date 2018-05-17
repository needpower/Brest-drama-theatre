import fetchMock from 'fetch-mock';
import mockStore from '../infrastructure/mockStore';
import * as actions from './actions';
import { eventData1, eventData2 } from './__mocks__';

describe('Event actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('All events are received', () => {
    const expectedResult = [eventData1, eventData2];
    fetchMock.get('http://mockserver.io/sasha', {
      body: { events: expectedResult },
      headers: { 'content-type': 'application/json' },
    });

    // expected actions
    const expectedActions = [
      {
        type: actions.GET_EVENTS_SUCCESS,
        payload: { events: expectedResult },
      },
    ];
    const store = mockStore({ events: [] });
    return store.dispatch(actions.getEvents()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
