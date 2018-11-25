import { format } from 'date-fns';
import { Box, Heading } from 'grommet';
import { routes } from 'infrastructure/router/routesMap';
import React from 'react';
import Link from 'redux-first-router-link';
import st from './list.module.scss';

const ru = require('date-fns/locale/ru');

export default function EventsList({ events }) {
  return events.map(event => (
    <Link
      key={event.id}
      to={{ type: [routes.EVENT], payload: { id: events[0].id } }}
      className={st.link}
    >
      <Box
        key={event.id}
        align="center"
        className={st.event}
        direction="row"
        justify="between"
        margin={{ vertical: 'xsmall' }}
        pad={{ horizontal: 'medium', vertical: 'medium' }}
        round="xsmall"
      >
        <Box className={st.about}>
          <Heading level={3} className={st.title}>
            <span>{event.title}</span>
          </Heading>
          {event.description}
        </Box>

        <Box>
          <div>{format(event.start, 'D MMMM YYYY', { locale: ru })}</div>
          <div>
            начало в &nbsp;
            {format(event.start, 'hh:mm', { locale: ru })}
          </div>
        </Box>
      </Box>
    </Link>
  ));
}
