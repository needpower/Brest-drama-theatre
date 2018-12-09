import { shape, number, string } from 'prop-types';

export const imageType = shape({
  id: number.isRequired,
  path: string.isRequired,
  height: number,
  weight: number,
  width: number,
});
