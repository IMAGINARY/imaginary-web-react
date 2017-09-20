import React from 'react';
import PropTypes from 'prop-types';
import EventGroup from './event-group.jsx';

export default class GroupedEventList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedGroup: null,
      sortField: 'name',
    };

    this.selectGroup = this.selectGroup.bind(this);
    this.sortByName = this.sortByName.bind(this);
    this.sortByCount = this.sortByCount.bind(this);
  }

  nameFieldName() {
    return 'name';
  }

  sortByName(ev) {
    this.setState({ sortField: 'name' });
    ev.preventDefault();
  }

  sortByCount(ev) {
    this.setState({ sortField: 'count' });
    ev.preventDefault();
  }

  selectGroup(group) {
    if (this.state.selectedGroup === group.props.name) {
      this.setState({
        selectedGroup: null,
      });
    } else {
      this.setState({
        selectedGroup: group.props.name,
      });
    }
  }

  groupEvents() {
    return {
      all: this.prop.events,
    };
  }

  groupNames(groupedEvents) {
    return Object.keys(groupedEvents);
  }

  containerClass() {
    return 'event-list-grouped-country';
  }

  render() {
    const groupedEvents = this.groupEvents();
    const groupNames = this.groupNames(groupedEvents);
    const groupComponents = [];
    const groups = [];

    for (const name of groupNames) {
      groups.push({
        name,
        count: groupedEvents[name].length,
      });
    }

    groups.sort((a, b) => {
      if (a[this.state.sortField] < b[this.state.sortField]) {
        return -1;
      } else if (a[this.state.sortField] > b[this.state.sortField]) {
        return 1;
      }
      return 0;
    });

    if (this.state.sortField === 'count') {
      groups.reverse();
    }

    for (const group of groups) {
      groupComponents.push(
        <EventGroup
          key={group.name}
          name={group.name}
          events={groupedEvents[group.name]}
          expanded={this.state.selectedGroup === group.name}
          onClick={this.selectGroup}
        />
      );
    }

    let sortControls = null;
    if (this.props.enableSort) {
      sortControls = (
        <ul className="event-list-sort">
          <li className={this.state.sortField === 'name' ? 'active' : ''}>
            <a href="" onClick={this.sortByName}>{window.Drupal.t('Sort alphabetically')}</a>
          </li>
          <li className={this.state.sortField === 'count' ? 'active' : ''}>
            <a href="" onClick={this.sortByCount}>{window.Drupal.t('Sort by number of events')}</a>
          </li>
        </ul>
      );
    }

    return (
      <div className="event-list-grouped-wrapper">
        {sortControls}
        <div className={this.containerClass()}>{groupComponents}</div>
      </div>
    );
  }
}

GroupedEventList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  enableSort: PropTypes.bool,
};

GroupedEventList.defaultProps = {
  enableSort: false,
};
