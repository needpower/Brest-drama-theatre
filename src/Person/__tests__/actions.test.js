import httpService from 'infrastructure/http';
import mockStore from 'infrastructure/mockStore';
import actions, { addPhotosType, removePhotosType } from '../actions';
import { alena, anton, viktor } from '../__mocks__/payload';

jest.mock('../../infrastructure/http');

describe('Person actions', () => {
  let store;

  const {
    get,
    fetchStart,
    fetchSuccess,
    add,
    createStart,
    createSuccess,
    update,
    updateStart,
    updateSuccess,
    updateError,
    delete: deleteEvent,
    deleteStart,
    deleteSuccess,
    addPhotos,
    removePhotos,
  } = actions;

  const initializeDB = (mockData) => {
    httpService.setMockDB(mockData);
  };

  const resetStore = () => {
    store = mockStore({ characters: [] });
  };

  const newPerson = id => ({
    id,
    about: '',
    name: 'Test person',
    photos: [],
  });

  beforeEach(() => {
    initializeDB([alena, anton, viktor]);
    resetStore();
  });

  test('All characters are fetched', () => {
    const expectedActions = [
      fetchStart(),
      fetchSuccess([alena, anton, viktor], {
        replace: true,
      }),
    ];

    expect.assertions(1);
    return store.dispatch(get()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Only specified characters are fetched', () => {
    const expectedActions = [
      fetchStart(),
      fetchSuccess([alena, viktor], {
        replace: true,
      }),
    ];

    expect.assertions(1);
    return store.dispatch(get([viktor.id, alena.id])).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('New person is added', () => {
    const newPersonID = 150999;
    const createdPerson = newPerson(newPersonID);
    const expectedActions = [createStart(createdPerson), createSuccess(createdPerson, newPersonID)];

    expect.assertions(1);
    return store.dispatch(add(createdPerson)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test("Person's info is updated", () => {
    const infoToUpdate = {
      id: viktor.id,
      about: 'Заслуженный артист Казахстана',
      photos: [134567, 990000, 222111],
    };
    const updatedPerson = {
      ...viktor,
      ...infoToUpdate,
    };
    const expectedActions = [updateStart(infoToUpdate), updateSuccess(updatedPerson)];

    expect.assertions(1);
    return store.dispatch(update(infoToUpdate)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Error dispatched if updated person not found', () => {
    const unexistedPersonId = 100000;
    const infoToUpdate = {
      id: unexistedPersonId,
      about: 'Такого человека у нас нет',
      role: 'Водяной',
    };
    const expectedActions = [
      updateStart(infoToUpdate),
      updateError(new Error('Source item not found'), infoToUpdate),
    ];

    return store.dispatch(update(infoToUpdate)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
