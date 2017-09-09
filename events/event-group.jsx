import React from 'react';
import PropTypes from 'prop-types';
import CSSTransition from 'react-transition-group/CSSTransition';
import EventList from './event-list.jsx';

const condClasses = require('classnames');

export default class EventGroup extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(ev) {
    ev.preventDefault();
    if (this.props.onClick) {
      this.props.onClick(this);
    }
  }

  render() {
    const groupSize = this.props.events.length;
    const eventList = <EventList events={this.props.events} displayCountry />;

    const classes = condClasses('event-list-group', {
      'event-list-group-expanded': this.props.expanded,
    });

    return (
      <div className={classes}>
        <button onClick={this.handleClick}>
          {this.props.name} <span className="event-list-group-size">{groupSize}</span>
        </button>
        <CSSTransition
          in={this.props.expanded}
          classNames="accordion"
          timeout={500}
          mountOnEnter
          unmountOnExit
        >
          {eventList}
        </CSSTransition>
      </div>);
  }
}

EventGroup.propTypes = {
  name: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  expanded: PropTypes.bool,
  onClick: PropTypes.func,
};
