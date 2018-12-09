import httpService from 'infrastructure/http';
import mockStore from 'infrastructure/mockStore';
import actions from '../actions';
import { img1, gogolPoster, museumsNight } from '../__mocks__/payload';

jest.mock('infrastructure/http');

describe('Image actions', () => {
  let store;

  const {
    get,
    fetchStart,
    fetchSuccess,
    upload,
    createStart,
    createSuccess,
    delete: deleteImage,
    deleteStart,
    deleteSuccess,
  } = actions;

  const initializeDB = (mockData) => {
    httpService.setMockDB(mockData);
  };

  const resetStore = () => {
    store = mockStore({ images: [] });
  };

  const newImage = id => ({
    id,
    height: 600,
    path: './mockImage.jpg',
    size: 0.85,
    width: 800,
  });

  beforeEach(() => {
    initializeDB([img1, gogolPoster, museumsNight]);
    resetStore();
  });

  test('All images are fetched', () => {
    const expectedActions = [
      fetchStart(),
      fetchSuccess([img1, gogolPoster, museumsNight], {
        replace: true,
      }),
    ];

    expect.assertions(1);
    return store.dispatch(get()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Some of images are fetched by id', () => {
    const expectedActions = [
      fetchStart(),
      fetchSuccess([gogolPoster, museumsNight], {
        replace: true,
      }),
    ];

    expect.assertions(1);
    return store.dispatch(get([gogolPoster.id, museumsNight.id])).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Image uploaded successfully', () => {
    const newImageId = 6234281;
    const imageToUpload = newImage(newImageId);
    const expectedActions = [createStart(imageToUpload), createSuccess(imageToUpload, newImageId)];

    expect.assertions(1);
    return store.dispatch(upload(imageToUpload)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Image deleted successfully', () => {
    const expectedActions = [deleteStart(gogolPoster), deleteSuccess(gogolPoster)];

    expect.assertions(1);
    return store.dispatch(deleteImage(gogolPoster)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
