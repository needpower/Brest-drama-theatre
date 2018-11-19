import { NOT_FOUND } from 'redux-first-router';
import { routes } from 'infrastructure/router/routesMap';

const pages = {
  [routes.EVENTS_LIST]: 'Events/Page/index',
  [routes.CHARACTERS]: 'Characters/Page/List',
  [routes.CONTACTS]: 'Contacts/index',
  [routes.SEARCH]: 'Search/index',
  [NOT_FOUND]: 'ui/Page/NotFound',
};

const reducer = (state = pages.EVENTS_LIST, action) => pages[action.type] || state;
export default reducer;
