import React from 'react';
import PropTypes from 'prop-types';

export default class EventList extends React.Component {

  static shortDate(date) {
    const convDate = new Date(date);
    return `${convDate.getDate()}/${convDate.getMonth() + 1}/${convDate.getYear() + 1900}`;
  }

  render() {

    const components = [];
    let i = 0;
    for (const event of this.props.events) {
      let date;
      if (event.permanent === '1') {
        date = `Since ${EventList.shortDate(event.dateFrom)}`;
      } else {
        date = `${EventList.shortDate(event.dateFrom)} to ${EventList.shortDate(event.dateTo)}`;
      }

      let location;
      if (this.props.displayCountry) {
        location = [event.city, event.country].filter(Boolean).join(', ');
      } else {
        location = event.city;
      }

      components.push(<li className="event-data" key={i}>
        <a href={event.url}>
          <div className="event-location">{location}</div>
          <div className="event-name">{event.title}</div>
          <div className="event-date">{date}</div>
        </a>
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
    permanent: PropTypes.string.isRequired,   // eslint-disable-line react/no-unused-prop-types
    title: PropTypes.string.isRequired,       // eslint-disable-line react/no-unused-prop-types
    url: PropTypes.string.isRequired,         // eslint-disable-line react/no-unused-prop-types
  })).isRequired,
  displayCountry: PropTypes.bool,
};
