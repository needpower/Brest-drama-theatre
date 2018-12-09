import actions from '../actions';
import reducer from '../reducer';
import { gogolPoster, img1, museumsNight } from '../__mocks__/payload';

const {
  fetchSuccess,
  createStart,
  createSuccess,
  createError,
  deleteStart,
  deleteSuccess,
  deleteError,
} = actions;

describe('Images reducer', () => {
  let state;

  /**
   * @param {Array} mockEvents
   */
  const initState = (mockEvents) => {
    state = mockEvents;
  };

  const resetState = () => {
    state = [];
  };

  const newImage = id => ({
    id,
    path: '',
    height: 400,
    weight: 1,
    width: 400,
  });

  beforeEach(() => {
    resetState();
  });

  test('Should return initial state', () => {
    expect(reducer(state, [{ type: '@@INIT' }])).toEqual(state);
  });

  test('Should add images from server into state', () => {
    const expectedState = [gogolPoster, img1, museumsNight];

    expect(reducer(state, fetchSuccess([gogolPoster, img1, museumsNight]))).toEqual(expectedState);
  });

  test('Should add created image to state', () => {
    initState([gogolPoster]);

    const newImageId = 4500113;
    const createdImage = newImage(newImageId);

    const expectedStatePending = [
      gogolPoster,
      {
        ...createdImage,
        busy: true,
        pendingCreate: true,
      },
    ];
    expect(reducer(state, createStart(createdImage))).toEqual(expectedStatePending);

    const expectedStateSuccess = [gogolPoster, createdImage];
    expect(reducer(state, createSuccess(createdImage, newImageId))).toEqual(expectedStateSuccess);

    // In case of creation error image should be removed from state
    const expectedStateError = [gogolPoster];
    expect(reducer(state, createError(new Error("Can't create image"), createdImage))).toEqual(expectedStateError);
  });

  test('Should delete images from state', () => {
    initState([gogolPoster, museumsNight, img1]);

    const expectedStatePending = [
      gogolPoster,
      {
        ...museumsNight,
        busy: true,
        deleted: true,
      },
      img1,
    ];
    expect(reducer(state, deleteStart(museumsNight))).toEqual(expectedStatePending);

    const expectedStateSuccess = [gogolPoster, img1];
    expect(reducer(state, deleteSuccess(museumsNight))).toEqual(expectedStateSuccess);

    const expectedStateError = [gogolPoster, museumsNight, img1];
    expect(reducer(state, deleteError(new Error("Can't delete image"), img1))).toEqual(expectedStateError);
  });
});
