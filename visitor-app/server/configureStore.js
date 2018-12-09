import createHistory from 'history/createMemoryHistory';
import { NOT_FOUND } from 'redux-first-router';
import configureStore from 'infrastructure/store';

function doesRedirect({ kind, pathname }, res) {
  if (kind === 'redirect') {
    res.redirect(302, pathname);
    return true;
  }
  return false;
}

export default async (req, res) => {
  const { store, routerThunk } = configureStore({
    history: createHistory,
    initialEntries: [req.path],
  });

  let currentLocation = store.getState().location;
  if (doesRedirect(currentLocation, res)) {
    return false;
  }

  // using redux-thunk perhaps request and dispatch some app-wide state as well, e.g:
  // await Promise.all([store.dispatch(myThunkA), store.dispatch(myThunkB)])
  await routerThunk(store);

  currentLocation = store.getState().location;
  if (doesRedirect(currentLocation, res)) {
    return false;
  }

  const status = currentLocation.type === NOT_FOUND ? 404 : 200;
  res.status(status);
  return store;
};
