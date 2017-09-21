import GroupedEventList from './grouped-event-list.jsx';

export default class CountryGroupedEventList extends GroupedEventList {


  groupEvents() {
    const groups = {};

    // Group events by country
    for (const event of this.props.events) {
      if (groups[event.country] === undefined) {
        groups[event.country] = [];
      }
      groups[event.country].push(event);
    }

    return groups;
  }

  nameFieldName() {
    return 'country';
  }

  containerClass() {
    return 'event-list-grouped-country';
  }
}