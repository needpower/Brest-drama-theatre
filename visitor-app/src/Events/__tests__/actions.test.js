import { img1, img2 } from 'Images/__mocks__/payload';
import httpService from 'infrastructure/http';
import mockStore from 'infrastructure/mockStore';
import { alena, anton } from 'Characters/__mocks__/payload';
import actions, {
  addCharacterType,
  addImagesType,
  deleteImagesType,
  removeCharacterType,
} from '../actions';
import { eventData1, eventData2 } from '../__mocks__/payload';

jest.mock('infrastructure/http');

describe('Theatre events actions', () => {
  let store;

  const {
    get,
    fetchStart,
    fetchSuccess,
    create,
    createStart,
    createSuccess,
    update,
    updateStart,
    updateSuccess,
    delete: deleteEvent,
    deleteStart,
    deleteSuccess,
    addImages,
    deleteImages,
    addCharacter,
    removeCharacter,
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
    const newEventID = 999991111;
    const createdEvent = newEvent(newEventID);
    const expectedActions = [createStart(createdEvent), createSuccess(createdEvent, newEventID)];

    expect.assertions(1);
    return store.dispatch(create(createdEvent)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Event is updated', () => {
    const eventPatch = {
      id: eventData2.id,
      author: 'Инокентий Малышев',
      duration: 30,
      price: 50,
    };

    const updatedEvent = {
      ...eventData2,
      ...eventPatch,
    };

    const expectedActions = [updateStart(eventPatch), updateSuccess(updatedEvent)];

    expect.assertions(1);
    return store.dispatch(update(eventPatch)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Images was attached to event', () => {
    const newImages = [img1.id, img2.id];
    const expectedAction = {
      type: addImagesType,
      eventId: eventData2.id,
      images: newImages,
    };

    expect(addImages(eventData2.id, newImages)).toEqual(expectedAction);
  });

  test('Images was removed from event', () => {
    const imagesToRemove = [img1.id, img2.id];
    const expectedAction = {
      type: deleteImagesType,
      eventId: eventData1.id,
      images: imagesToRemove,
    };

    expect(deleteImages(eventData1.id, imagesToRemove)).toEqual(expectedAction);
  });

  test('Character is added to event', () => {
    const characterToAdd = {
      role: 'Writer',
      personId: alena.id,
    };
    const expectedAction = {
      type: addCharacterType,
      eventId: eventData1.id,
      character: characterToAdd,
    };

    expect(addCharacter(eventData1.id, characterToAdd)).toEqual(expectedAction);
  });

  test('Character is removed from event', () => {
    const characterToRemove = {
      role: 'Ярослав Мудрый',
      personId: anton.id,
    };
    const expectedAction = {
      type: removeCharacterType,
      eventId: eventData1.id,
      character: characterToRemove,
    };

    expect(removeCharacter(eventData1.id, characterToRemove)).toEqual(expectedAction);
  });

  test('Event is deleted', () => {
    const expectedActions = [deleteStart(eventData1), deleteSuccess(eventData1)];

    expect.assertions(1);
    return store.dispatch(deleteEvent(eventData1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
