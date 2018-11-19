import {
  shape, number, string, oneOf,
} from 'prop-types';

export const characterType = shape({
  id: number.isRequired,
  name: string.isRequired,
  role: oneOf([]), // TODO: what roles are applicable?
  about: string.isRequired,
});
