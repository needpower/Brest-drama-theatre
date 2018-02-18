import { dateToHumanFriendlyFormat } from './dateToHumanFriendlyFormat';


it('Human dates converts from ISO format correctly', () => {
  const ISOstrings = {
    '2018-04-03': '3 апреля 2018 г.',
    '2005-08': 'август 2005',
    '2014-09-01T18:31:42': '1 сентября 2014 г., 18:31',
  };

  Object.keys(ISOstrings).forEach((key) => {
    expect(dateToHumanFriendlyFormat(key)).toContain(ISOstrings[key]);
  });
});
