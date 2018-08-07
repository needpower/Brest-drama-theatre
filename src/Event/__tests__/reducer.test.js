import actions from '../actions';
import reducer from '../reducer';
import { eventData1, eventData2 } from '../__mocks__/payload';

const {
  fetchSuccess,
  createStart,
  createSuccess,
  createError,
  updateStart,
  updateSuccess,
  deleteStart,
  deleteSuccess,
} = actions;

describe('Events reducer', () => {
  let state;

  const resetState = () => {
    state = [];
  };

  const newEvent = id => ({
    id,
    ageRestrictions: null,
    author: 'Тимур Бактамбетов',
    characters: [],
    description: '',
    duration: 85,
    genre: '',
    hall: 'big',
    language: 'ru',
    poster: null,
    price: [15, 30, 45],
    start: '2018-02-14T12:48:07.445Z',
    title: 'Турецкий Гамбит',
  });

  beforeEach(() => {
    resetState();
  });

  test('Should return initial state', () => {
    expect(reducer(state, [{ type: '@@INIT' }])).toEqual(state);
  });

  test('Should add events, fetched from server, to state', () => {
    const expectedState = [eventData1, eventData2];

    expect(reducer(state, fetchSuccess([eventData1, eventData2]))).toEqual(expectedState);
  });

  test('Should add event to state, created by user', () => {
    const newEventId = 900011;
    const createdEvent = newEvent(newEventId);

    const expectedPendingCreateState = [
      {
        ...createdEvent,
        busy: true,
        pendingCreate: true,
      },
    ];
    expect(reducer(state, createStart(createdEvent))).toEqual(expectedPendingCreateState);

    const expectedState = [createdEvent];
    expect(reducer(state, createSuccess(createdEvent, newEventId))).toEqual(expectedState);
  });

  test('In case of creation error should be removed from state', () => {
    const newEventId = 900011;
    const createdEvent = newEvent(newEventId);

    expect(reducer(
      [createdEvent, newEvent(5001005)],
      createError(new Error("Can't create"), createdEvent),
    )).toEqual([newEvent(5001005)]);
  });

  test('Should update event in state', () => {
    state = [eventData1, eventData2];

    const updatedEvent = {
      ...eventData2,
      duration: 110,
      hall: 'big',
      start: '2018-06-13T19:00:00.445Z',
    };

    const expectedPendingState = [
      eventData1,
      {
        ...updatedEvent,
        busy: true,
        pendingUpdate: true,
      },
    ];

    expect(reducer(state, updateStart(updatedEvent))).toEqual(expectedPendingState);

    const expectedSuccessState = [eventData1, updatedEvent];
    expect(reducer(state, updateSuccess(updatedEvent))).toEqual(expectedSuccessState);
  });

  test('Should delete event from state', () => {
    state = [eventData1, eventData2];

    const expectedPendingState = [
      {
        ...eventData1,
        deleted: true,
        busy: true,
      },
      eventData2,
    ];
    expect(reducer(state, deleteStart(eventData1))).toEqual(expectedPendingState);

    const expectedSuccessState = [eventData2];
    expect(reducer(state, deleteSuccess(eventData1))).toEqual(expectedSuccessState);
  });
});
