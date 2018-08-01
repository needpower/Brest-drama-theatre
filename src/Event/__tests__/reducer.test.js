import httpService from '../../infrastructure/http';
import actions from '../actions';
import reducer from '../reducer';
import { eventData1, eventData2 } from '../__mocks__/payload';

jest.mock('../../infrastructure/http');

describe('Events reducer', () => {
  let state = {
    events: [],
  };

  const initializeDB = (mockData) => {
    httpService.setMockDB(mockData);
  };

  const resetState = () => {
    state = {
      events: [],
    };
  };

  const {
    fetchStart,
    fetchSuccess,
    createStart,
    createSuccess,
    updateStart,
    updateSuccess,
    deleteStart,
    deleteSuccess,
  } = actions;

  beforeEach(() => {
    initializeDB();
    resetState();
  });

  it('Should return initial state', () => {
    expect(reducer(state, {})).toEqual(state);
  });

  it('Should add fethed events to state', () => {
    const expectedState = {
      events: [eventData1, eventData2],
    };

    expect(reducer(state, fetchSuccess([eventData1, eventData2]))).toEqual(expectedState);
  });
});
