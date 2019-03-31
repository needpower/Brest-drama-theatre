import { routes } from './router/routesMap';

export const defaultTitle = 'Брестский академический театр драмы';
export const title = (state = defaultTitle, action) => {
  const type = Array.isArray(action.type) ? action.type[0] : action.type;
  switch (type) {
    case routes.EVENTS_LIST: {
      return `Афиша \u2013 ${defaultTitle}`;
    }
    case routes.EVENT: {
      return `${action.payload.id} \u2013 ${defaultTitle}`;
    }
    default:
      return defaultTitle;
  }
};
