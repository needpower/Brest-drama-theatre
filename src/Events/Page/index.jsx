import { getMainEvents, getOtherEvents } from 'Events/selectors';
import { eventType } from 'Events/types';
import { Box } from 'grommet';
import { imageType } from 'Images/types';
import { arrayOf } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import EventsList from './List';
import MainEvents from './Main';

function EventsPage({ mainEvents, otherEvents, posters }) {
  return (
    <Box>
      <MainEvents events={mainEvents} posters={posters} />
      <EventsList events={otherEvents} />
    </Box>
  );
}

EventsPage.propTypes = {
  mainEvents: arrayOf(eventType),
  otherEvents: arrayOf(eventType),
  posters: arrayOf(imageType),
};

EventsPage.defaultProps = {
  mainEvents: [],
  otherEvents: [],
  posters: [],
};

export default connect(state => ({
  mainEvents: getMainEvents(state),
  otherEvents: getOtherEvents(state),
  posters: state.domain.images,
}))(EventsPage);
