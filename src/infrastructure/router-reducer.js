import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = {
  locationBeforeTransitions: null,
};

const routerReducer = (state = initialState, action) => {
  if (action.type === LOCATION_CHANGE) {
    return state.merge({
      locationBeforeTransitions: action.payload,
    });
  }
  return state;
};

export default routerReducer;
