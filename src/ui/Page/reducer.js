import { NOT_FOUND } from 'redux-first-router';

const pages = {
  EVENTS_LIST: 'Events/Page/List',
  CHARACTERS: 'Characters/Page/List',
  [NOT_FOUND]: 'NotFound',
};

const reducer = (state = pages.EVENTS_LIST, action) => pages[action.type] || state;
export default reducer;
