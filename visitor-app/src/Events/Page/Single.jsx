import React from 'react';
import { connect } from 'react-redux';
import { getEvent } from 'Events/selectors';
import { eventType } from 'Events/types';

function SingleEvent({ event }) {
  if (!event) {
    return null;
  }

  return (
    <div>
      {event.genre}
      {' '}
      {event.title}
    </div>
  );
}

SingleEvent.propTypes = {
  event: eventType,
};

SingleEvent.defaultProps = {
  event: undefined,
};

export default connect(state => ({
  event: getEvent(state.location.payload.id)(state),
}))(SingleEvent);
