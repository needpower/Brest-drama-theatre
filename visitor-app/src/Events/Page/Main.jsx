import { format } from 'date-fns';
import { baseURL } from 'infrastructure/http';
import { eventType } from 'Events/types';
import { Box, Grid, Image } from 'grommet';
import { defaultImage } from 'Images/model';
import { routes } from 'infrastructure/router/routesMap';
import { arrayOf } from 'prop-types';
import React from 'react';
import Link from 'redux-first-router-link';
import st from './main.module.scss';

function findPoster(event) {
  return event.poster ? `${baseURL}${event.poster.url}` : defaultImage.path;
}

const ru = require('date-fns/locale/ru');

export default function MainEvents({ events }) {
  if (!(events && events.length)) {
    return null;
  }

  return (
    <Grid
      areas={[
        { name: 'event1', start: [0, 0], end: [1, 1] },
        { name: 'event2', start: [2, 0], end: [2, 0] },
        { name: 'event3', start: [0, 2], end: [0, 2] },
        { name: 'event4', start: [1, 2], end: [1, 2] },
        { name: 'event5', start: [2, 1], end: [2, 2] },
      ]}
      columns={['flex', 'flex', 'flex']}
      rows={['medium', 'medium', 'medium']}
      className={st.events}
    >
      <Box gridArea="event1" background="red" className={st.mainEvent}>
        <Link to={{ type: [routes.EVENT], payload: { id: events[0].id } }} className={st.link} />
        <Image className={st.poster} fit="cover" src={findPoster(events[0])} />
        <Box className={st.caption}>
          <div className={st.title}>{events[0].title}</div>
          <div className={st.description}>
            {format(events[0].startAt, 'D MMMM', { locale: ru })}
          </div>
        </Box>
      </Box>
      <Box gridArea="event2" background="green" className={st.mainEvent}>
        <Link to={{ type: [routes.EVENT], payload: { id: events[1].id } }} className={st.link} />
        <Image className={st.poster} fit="cover" src={findPoster(events[1])} />
        <Box className={st.caption}>
          <div className={st.title}>{events[1].title}</div>
          <div className={st.description}>
            {format(events[1].startAt, 'D MMMM', { locale: ru })}
          </div>
        </Box>
      </Box>
      <Box gridArea="event3" background="brand" className={st.mainEvent}>
        <Link to={{ type: [routes.EVENT], payload: { id: events[2].id } }} className={st.link} />
        <Image className={st.poster} fit="cover" src={findPoster(events[2])} />
        <Box className={st.caption}>
          <div className={st.title}>{events[2].title}</div>
          <div className={st.description}>
            {format(events[2].startAt, 'D MMMM', { locale: ru })}
          </div>
        </Box>
      </Box>
      <Box gridArea="event4" background="accent-2" className={st.mainEvent}>
        <Link to={{ type: [routes.EVENT], payload: { id: events[3].id } }} className={st.link} />
        <Image className={st.poster} fit="cover" src={findPoster(events[3])} />
        <Box className={st.caption}>
          <div className={st.title}>{events[3].title}</div>
          <div className={st.description}>
            {format(events[3].startAt, 'D MMMM', { locale: ru })}
          </div>
        </Box>
      </Box>
      <Box gridArea="event5" background="accent-1" className={st.mainEvent}>
        <Link to={{ type: [routes.EVENT], payload: { id: events[4].id } }} className={st.link} />
        <Image className={st.poster} fit="cover" src={findPoster(events[4])} />
        <Box className={st.caption}>
          <div className={st.title}>{events[4].title}</div>
          <div className={st.description}>
            {format(events[4].startAt, 'D MMMM', { locale: ru })}
          </div>
        </Box>
      </Box>
    </Grid>
  );
}

MainEvents.propTypes = {
  events: arrayOf(eventType).isRequired,
};
