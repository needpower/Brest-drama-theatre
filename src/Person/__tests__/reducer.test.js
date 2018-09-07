import actions from '../actions';
import reducer from '../reducer';
import { alena, anton, viktor } from '../__mocks__/payload';

const {
  fetchSuccess,
  createStart,
  createSuccess,
  createError,
  updateStart,
  updateSuccess,
  updateError,
  deleteStart,
  deleteSuccess,
  deleteError,
  addPhotos,
  removePhotos,
} = actions;

describe('Cahacters reducer', () => {
  let state;

  /**
   * @param {Array} mockCharacters
   */
  const initState = (mockCharacters) => {
    state = mockCharacters;
  };

  const resetState = () => {
    state = [];
  };

  /**
   * Emulation of dispatching an action
   * @param {Object} action
   */
  const dispatch = (action) => {
    state = reducer(state, action);
  };

  const newCharacter = id => ({
    id,
    about: '',
    name: 'Test person',
    photos: [],
  });

  beforeEach(() => {
    resetState();
  });

  test('Should return initial state', () => {
    expect(reducer(state, [{ type: '@@INIT' }])).toEqual(state);
  });

  test('Should add characters, fetched from server, to state', () => {
    const expectedState = [alena, anton, viktor];

    expect(reducer(state, fetchSuccess([alena, anton, viktor]))).toEqual(expectedState);
  });

  test('Should add created character to state', () => {
    initState([anton, viktor]);

    const newCharacterId = 654321;
    const character = newCharacter(newCharacterId);

    const expectedStatePending = [
      anton,
      viktor,
      {
        ...character,
        busy: true,
        pendingCreate: true,
      },
    ];
    expect(reducer(state, createStart(character))).toEqual(expectedStatePending);

    const expectedStateSuccess = [anton, viktor, character];
    expect(reducer(state, createSuccess(character, newCharacterId))).toEqual(expectedStateSuccess);
  });

  test('In case of creation error character should be removed from state', () => {
    initState([anton, viktor]);

    const newCharacterId = 654321;
    const character = newCharacter(newCharacterId);

    expect(reducer(state, createError(new Error("Can't create character"), character))).toEqual(state);
  });

  test("Should update character's payload", () => {
    initState([alena, anton]);

    const updatedCharacter = {
      ...alena,
      role: 'Денежный управленец',
      photos: [555555],
    };

    const expectedStatePending = [
      {
        ...updatedCharacter,
        busy: true,
        pendingUpdate: true,
      },
      anton,
    ];
    expect(reducer(state, updateStart(updatedCharacter))).toEqual(expectedStatePending);

    const expectedStateSuccess = [
      {
        ...updatedCharacter,
      },
      anton,
    ];
    expect(reducer(state, updateSuccess(updatedCharacter))).toEqual(expectedStateSuccess);
  });

  test('Should handle update error', () => {
    initState([anton, viktor]);
    const updatedCharacter = {
      ...viktor,
      photos: [650013, 778090],
    };
    dispatch(updateStart(updatedCharacter));

    const expectedState = [
      anton,
      {
        ...updatedCharacter,
        pendingUpdate: true,
      },
    ];
    expect(reducer(state, updateError(new Error("Can't update character"), updatedCharacter))).toEqual(expectedState);
  });

  test('Should add photos', () => {
    initState([anton, viktor]);
    const photosToAdd = [991123, 860034];
    const expectedState = [
      {
        ...anton,
        photos: [...anton.photos, ...photosToAdd],
      },
      viktor,
    ];

    expect(reducer(state, addPhotos(anton.id, photosToAdd))).toEqual(expectedState);
  });

  test('Should remove photos', () => {
    initState([alena, viktor]);
    const photosToRemove = [188101, 222333, 100000];
    const expectedState = [
      {
        ...alena,
        photos: [555000],
      },
      viktor,
    ];

    expect(reducer(state, removePhotos(alena.id, photosToRemove))).toEqual(expectedState);
  });

  test('Should delete character from state', () => {
    initState([alena, anton, viktor]);

    const expectedStatePending = [
      alena,
      {
        ...anton,
        deleted: true,
        busy: true,
      },
      viktor,
    ];
    expect(reducer(state, deleteStart(anton))).toEqual(expectedStatePending);

    const expectedStateSuccess = [alena, viktor];
    expect(reducer(state, deleteSuccess(anton))).toEqual(expectedStateSuccess);
  });

  test('Should handle delete error', () => {
    initState([alena, anton, viktor]);
    dispatch(deleteStart(alena));

    const expectedState = [alena, anton, viktor];
    expect(reducer(state, deleteError(new Error("Can't delete character"), alena))).toEqual(expectedState);
  });
});
