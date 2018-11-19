import {
  bool, shape, number, string, arrayOf, oneOf,
} from 'prop-types';

export const eventType = shape({
  id: number.isRequired,
  ageRestrictions: number,
  author: string.isRequired,
  characters: arrayOf(shape({ role: string, id: number })),
  description: string,
  duration: number.isRequired,
  genre: string,
  hall: oneOf(['big', 'small']),
  gallery: arrayOf(number),
  isMainEvent: bool,
  language: oneOf(['ru', 'be', 'en', 'lt']),
  poster: number.isRequired,
  start: string.isRequired,
  title: string.isRequired,
});
