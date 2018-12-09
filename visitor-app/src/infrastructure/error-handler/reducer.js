import { genericErrorType } from './action';

export default function reducer(state = [], action) {
  switch (action.type) {
    case genericErrorType: {
      return [...state, action.error];
    }

    default: {
      return state;
    }
  }
}
