import React from 'react';
import { Box, Heading } from 'grommet';
import { format } from 'date-fns';

const ru = require('date-fns/locale/ru');

export default function EventsList({ events }) {
  return events.map(event => (
    <Box key={event.id} align="center" direction="row" elevation="small" justify="between">
      <Heading level={3}>{event.title}</Heading>
      <div>{format(event.start, 'D MMMM YYYY', { locale: ru })}</div>
    </Box>
  ));
}
