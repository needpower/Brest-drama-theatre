import { getMainEvents, getOtherEvents } from 'Events/selectors';
import { eventType } from 'Events/types';
import { Box } from 'grommet';
import { arrayOf } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import EventsList from './List';
import MainEvents from './Main';

function EventsPage({ mainEvents, otherEvents }) {
  return (
    <Box>
      <MainEvents events={mainEvents} />
      <EventsList events={otherEvents} />
    </Box>
  );
}

EventsPage.propTypes = {
  mainEvents: arrayOf(eventType),
  otherEvents: arrayOf(eventType),
};

EventsPage.defaultProps = {
  mainEvents: [],
  otherEvents: [],
};

export default connect(state => ({
  mainEvents: getMainEvents(state),
  otherEvents: getOtherEvents(state),
}))(EventsPage);
