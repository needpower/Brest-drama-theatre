import {
  bool, shape, number, string, arrayOf, oneOf,
} from 'prop-types';
import { characterType } from 'Characters/types';
import { imageType } from 'Images/types';

export const eventType = shape({
  id: number.isRequired,
  ageRestrictions: number,
  author: characterType,
  characters: arrayOf(characterType),
  description: string,
  duration: number.isRequired,
  genre: string,
  hall: oneOf(['большой', 'малый']),
  gallery: arrayOf(imageType),
  isMainEvent: bool,
  language: oneOf(['ru-RU', 'by-BY', 'en-US']),
  poster: imageType,
  startAt: string.isRequired,
  title: string.isRequired,
});
