import reduxCatch from 'redux-catch';

const errorHandler = (error, getState, lastAction, dispatch) => {
  dispatch(error);
};

export default reduxCatch(errorHandler);
