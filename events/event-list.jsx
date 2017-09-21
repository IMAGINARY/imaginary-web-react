import React from 'react';
import PropTypes from 'prop-types';
import EventTeaser from './event-teaser.jsx';

export default class EventList extends React.Component {
  render() {
    const components = [];
    let i = 0;
    for (const event of this.props.events) {
      components.push(<li className="event-data" key={i}>
        <EventTeaser event={event} showThumbnail={false} />
      </li>);
      i += 1;
    }

    return <ul className="event-list">{components}</ul>;
  }
}

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    country: PropTypes.string.isRequired,     // eslint-disable-line react/no-unused-prop-types
    city: PropTypes.string.isRequired,        // eslint-disable-line react/no-unused-prop-types
    dateFrom: PropTypes.string.isRequired,    // eslint-disable-line react/no-unused-prop-types
    dateTo: PropTypes.string.isRequired,      // eslint-disable-line react/no-unused-prop-types
    permanent: PropTypes.bool.isRequired,   // eslint-disable-line react/no-unused-prop-types
    title: PropTypes.string.isRequired,       // eslint-disable-line react/no-unused-prop-types
    url: PropTypes.string.isRequired,         // eslint-disable-line react/no-unused-prop-types
  })).isRequired,
};
