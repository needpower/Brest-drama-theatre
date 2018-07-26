import cuid from 'cuid';
import httpService from '../../infrastructure/http';
import mockStore from '../../infrastructure/mockStore';
import actions from '../actions';
import { eventData1, eventData2 } from '../__mocks__/payload';

jest.mock('../../infrastructure/http');

describe('Theatre events actions', () => {
  let store;

  const {
    get, fetchStart, fetchSuccess, create, createStart, createSuccess,
  } = actions;

  const initializeDB = (mockData) => {
    httpService.setMockDB(mockData);
  };

  const resetStore = () => {
    store = mockStore({ events: [] });
  };

  const newEvent = id => ({
    id,
    ageRestrictions: null,
    author: 'Эльдар Рязанов',
    characters: [],
    description: '',
    duration: 90,
    genre: '',
    hall: 'big',
    language: 'ru',
    poster: null,
    price: [7, 9, 12],
    start: '2018-02-14T12:48:07.445Z',
    title: 'Шурик',
  });

  beforeEach(() => {
    initializeDB([eventData1, eventData2]);
    resetStore();
  });

  test('All events are fetched', () => {
    const expectedActions = [
      fetchStart(),
      fetchSuccess([eventData1, eventData2], {
        replace: true,
      }),
    ];

    expect.assertions(1);
    return store.dispatch(get()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Events with provided ids are fetched', () => {
    const expectedActions = [
      fetchStart(),
      fetchSuccess([eventData2], {
        replace: true,
      }),
    ];

    expect.assertions(1);
    return store.dispatch(get([eventData2.id])).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('New event is created and stored', () => {
    const newEventID = cuid();
    const createdEvent = newEvent(newEventID);
    const expectedActions = [createStart(createdEvent), createSuccess(createdEvent, newEventID)];

    return store.dispatch(create(createdEvent)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test.skip('event is updated', () => {
    axios.put.mockImplementation(() => Promise.resolve(eventData2));
    const expectedActions = [actions.updateEventSuccess(eventData2)];

    return store.dispatch(actions.updateEvent(eventData1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test.skip('event is deleted', () => {
    const eventIdToDelete = eventData1.id;
    const expectedActions = [actions.deleteEventSuccess(eventIdToDelete)];
    axios.delete.mockImplementation(() => Promise.resolve(eventIdToDelete));

    return store.dispatch(actions.deleteEvent(eventIdToDelete)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
