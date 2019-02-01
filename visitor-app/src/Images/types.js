import { shape, number, string } from 'prop-types';

export const imageType = shape({
  id: number.isRequired,
  name: string.isRequired,
  size: string.isRequired,
  url: string.isRequired,
});
