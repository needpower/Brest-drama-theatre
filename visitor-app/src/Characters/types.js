import { shape, number, string } from 'prop-types';

export const characterType = shape({
  id: number.isRequired,
  name: string.isRequired,
  description: string,
});
