import React from 'react';
import { Box, Grid, Image } from 'grommet';
import { format } from 'date-fns';
import { arrayOf } from 'prop-types';
import Link from 'redux-first-router-link';
import { defaultImage } from 'Images/model';
import { imageType } from 'Images/types';
import { eventType } from '../types';
import st from './main.module.scss';

function findPoster(event, posters) {
  return posters.find(poster => poster.id === event.poster) || defaultImage;
}

const ru = require('date-fns/locale/ru');

export default function MainEvents({ events, posters }) {
  return (
    events.length && (
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
      >
        <Box gridArea="event1" background="red" className={st.mainEvent}>
          <Link to="/opa" className={st.link} />
          <Image className={st.poster} fit="cover" src={findPoster(events[0], posters).path} />
          <Box className={st.caption}>
            <div className={st.title}>{events[0].title}</div>
            <div className={st.description}>
              {format(events[0].start, 'D MMMM', { locale: ru })}
            </div>
          </Box>
        </Box>
        <Box gridArea="event2" background="green" className={st.mainEvent}>
          <Link to="/opa" className={st.link} />
          <Image className={st.poster} fit="cover" src={findPoster(events[1], posters).path} />
          <Box className={st.caption}>
            <div className={st.title}>{events[1].title}</div>
            <div className={st.description}>
              {format(events[1].start, 'D MMMM', { locale: ru })}
            </div>
          </Box>
        </Box>
        <Box gridArea="event3" background="brand" className={st.mainEvent}>
          <Link to="/opa" className={st.link} />
          <Image className={st.poster} fit="cover" src={findPoster(events[2], posters).path} />
          <Box className={st.caption}>
            <div className={st.title}>{events[2].title}</div>
            <div className={st.description}>
              {format(events[2].start, 'D MMMM', { locale: ru })}
            </div>
          </Box>
        </Box>
        <Box gridArea="event4" background="accent-2" className={st.mainEvent}>
          <Link to="/opa" className={st.link} />
          <Image className={st.poster} fit="cover" src={findPoster(events[3], posters).path} />
          <Box className={st.caption}>
            <div className={st.title}>{events[3].title}</div>
            <div className={st.description}>
              {format(events[3].start, 'D MMMM', { locale: ru })}
            </div>
          </Box>
        </Box>
        <Box gridArea="event5" background="accent-1" className={st.mainEvent}>
          <Link to="/opa" className={st.link} />
          <Image className={st.poster} fit="cover" src={findPoster(events[4], posters).path} />
          <Box className={st.caption}>
            <div className={st.title}>{events[4].title}</div>
            <div className={st.description}>
              {format(events[4].start, 'D MMMM', { locale: ru })}
            </div>
          </Box>
        </Box>
      </Grid>
    )
  );
}

MainEvents.propTypes = {
  events: arrayOf(eventType).isRequired,
  posters: arrayOf(imageType).isRequired,
};
