/* globals Drupal */
import React from 'react';
import PropTypes from 'prop-types';

export default class EventTeaser extends React.Component {
  static shortDate(date) {
    const convDate = new Date(date);
    return `${convDate.getDate()}/${convDate.getMonth() + 1}/${convDate.getYear() + 1900}`;
  }

  eventDate() {
    const event = this.props.event;
    if (event.permanent) {
      return Drupal.t('Since @date', { '@date': EventTeaser.shortDate(event.dateFrom) });
    }
    return Drupal.t('@dateFrom to @dateTo', {
      '@dateFrom': EventTeaser.shortDate(event.dateFrom),
      '@dateTo': EventTeaser.shortDate(event.dateTo),
    });
  }

  eventLocation() {
    return [this.props.event.city, this.props.event.country].filter(Boolean).join(', ');
  }

  render() {
    const event = this.props.event;
    let thumbnail = null;

    if (this.props.showThumbnail) {
      if (event.thumbnail !== undefined) {
        thumbnail = <img className="event-thumbnail" src={event.thumbnail} alt={event.title} />;
      } else {
        thumbnail = <div className="event-thumbnail event-thumbnail-default" />;
      }
    }

    return (
      <a href={event.url} className="event-teaser">
        {thumbnail}
        <div className="event-location">{this.eventLocation(event)}</div>
        <div className="event-name">{event.title}</div>
        <div className="event-date">{this.eventDate(event)}</div>
      </a>
    );
  }
}

EventTeaser.propTypes = {
  event: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    dateFrom: PropTypes.string,
    dateTo: PropTypes.string,
    permanent: PropTypes.bool.isRequired,
    city: PropTypes.string,
    thumbnail: PropTypes.string,
  }).isRequired,
  showThumbnail: PropTypes.bool,
};

EventTeaser.defaultProps = {
  showThumbnail: true,
};
