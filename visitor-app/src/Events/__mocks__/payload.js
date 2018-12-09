import { gogolPoster, museumsNight } from 'Images/__mocks__/payload';
import { anton, alena, viktor } from 'Characters/__mocks__/payload';

export const eventData1 = {
  id: 100001,
  ageRestrictions: 14,
  author: 'Viktor Hlinka',
  characters: [
    {
      role: 'Художник-постановщик',
      personId: alena.id,
    },
    {
      role: 'Сценарист',
      personId: anton.id,
    },
  ],
  description: 'Трагикомедия обо всём по чуть-чуть',
  duration: 118,
  genre: 'Трагикомедия в 2-х действиях',
  hall: 'big',
  gallery: [gogolPoster.id],
  language: 'ru',
  poster: gogolPoster.id,
  price: [7, 9, 12],
  start: '2018-02-14T12:48:07.445Z',
  title: 'Горе от ума',
};

export const eventData2 = {
  id: 98367700,
  ageRestrictions: 12,
  author: 'Эльдар Рязанов',
  characters: [
    {
      role: 'Шурик',
      personId: viktor.id,
    },
  ],
  description: 'Пьеса, как жили, узнавали суть и не забывали о ней',
  duration: 90,
  genre: 'Пьеса',
  hall: 'small',
  gallery: [museumsNight.id, gogolPoster.id],
  language: 'by',
  poster: museumsNight.id,
  price: 10,
  start: '2018-03-27T12:48:07.445Z',
  title: 'Соседи',
};
