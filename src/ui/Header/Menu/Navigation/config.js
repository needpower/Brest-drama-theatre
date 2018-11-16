import { routes } from 'infrastructure/router/routesMap';

const navigation = [
  {
    path: { type: [routes.EVENTS_LIST] },
    name: 'Афиша',
  },
  {
    path: { type: [routes.CHARACTERS] },
    name: 'Лица',
  },
  {
    path: { type: [routes.CONTACTS] },
    name: 'Контакты',
  },
];

export default navigation;
