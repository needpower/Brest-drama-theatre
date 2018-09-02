import httpService from 'infrastructure/http';
import { gogolPoster, img1, museumsNight } from 'Image/__mocks__/payload';
import { alena, viktor } from 'Person/__mocks__/payload';
import actions from '../actions';
import reducer from '../reducer';
import { eventData1, eventData2 } from '../__mocks__/payload';

jest.mock('infrastructure/http');

const {
  fetchSuccess,
  createStart,
  createSuccess,
  createError,
  updateStart,
  updateSuccess,
  deleteStart,
  deleteSuccess,
  addImages,
  deleteImages,
  addCharacter,
  removeCharacter,
} = actions;

describe('Events reducer', () => {
  let state;

  /**
   * @param {Array} mockData
   */
  const initializeDB = (mockData) => {
    httpService.setMockDB(mockData);
  };

  /**
   * @param {Array} mockEvents
   */
  const initState = (mockEvents) => {
    state = mockEvents;
  };

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
    gallery: [],
    language: 'ru',
    poster: null,
    price: [15, 30, 45],
    start: '2018-02-14T12:48:07.445Z',
    title: 'Турецкий Гамбит',
  });

  beforeEach(() => {
    initializeDB([eventData1, eventData2]);
    resetState();
  });

  test('Should return initial state', () => {
    expect(reducer(state, [{ type: '@@INIT' }])).toEqual(state);
  });

  test('Should add events, fetched from server, to state', () => {
    const expectedState = [eventData1, eventData2];

    expect(reducer(state, fetchSuccess([eventData1, eventData2]))).toEqual(expectedState);
  });

  test('Should add created event to state', () => {
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

  test('Should update primitive event payload (e.g title, diration, price)', () => {
    initState([eventData1, eventData2]);

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

  test("Should add images to event's gallery", () => {
    initState([eventData1]);
    const imagesToAdd = [img1.id, museumsNight.id];
    const expectedState = [
      {
        ...eventData1,
        gallery: [...eventData1.gallery, ...imagesToAdd],
      },
    ];

    expect(reducer(state, addImages(eventData1.id, imagesToAdd))).toEqual(expectedState);
  });

  test("Should remove images from event's gallery", () => {
    initState([eventData2]);
    const imagesToRemove = [museumsNight.id];
    const expectedState = [
      {
        ...eventData2,
        gallery: [gogolPoster.id],
      },
    ];

    expect(reducer(state, deleteImages(eventData2.id, imagesToRemove))).toEqual(expectedState);
  });

  test('Should add characters to event', () => {
    initState([eventData2]);
    const Yunona = {
      role: 'Юнона',
      personId: alena.id,
    };

    // Add first character
    const expectedStateWithYunona = [
      {
        ...eventData2,
        characters: [...eventData2.characters, Yunona],
      },
    ];
    expect(reducer(state, addCharacter(eventData2.id, Yunona))).toEqual(expectedStateWithYunona);
  });

  test('Should remove character from event in state', () => {
    initState([eventData1, eventData2]);
    let characterToRemove = {
      role: 'Такой роли нет',
      personId: viktor.id,
    };
    // Do nothing if character not found
    expect(reducer(state, removeCharacter(eventData1.id, characterToRemove))).toEqual(state);

    characterToRemove = {
      role: 'Художник-постановщик',
      personId: alena.id,
    };
    const expectedState = [
      {
        ...eventData1,
        characters: eventData1.characters.filter(character => character.role !== 'Художник-постановщик'),
      },
      eventData2,
    ];
    expect(reducer(state, removeCharacter(eventData1.id, characterToRemove))).toEqual(expectedState);
  });

  test('Should delete event from state', () => {
    initState([eventData1, eventData2]);

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
