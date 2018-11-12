import { createSelector } from 'reselect';
import { routes } from 'infrastructure/router/routesMap';

const getCurrentLocation = state => state.location.type;
export const isSearchOpened = createSelector([getCurrentLocation], (location) => {
  if (typeof location === 'string') {
    return location === routes.SEARCH;
  }

  return location.includes(routes.SEARCH);
});
