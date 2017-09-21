import GroupedEventList from './grouped-event-list.jsx';

export default class YearGroupedEventList extends GroupedEventList {

  constructor(props) {
    super(props);

    this.ongoingName = window.Drupal.t('Permanent');
  }

  groupEvents() {
    const groups = {};
    groups[this.ongoingName] = [];

    // Grop events by year
    for (const event of this.props.events) {
      const date = new Date(event.dateFrom);
      const year = date.getFullYear();

      if (event.permanent) {
        groups[this.ongoingName].push(event);
      } else {
        if (groups[year] === undefined) {
          groups[year] = [];
        }

        groups[year].push(event);
      }
    }

    return groups;
  }

  groupNames(groupedEvents) {
    const years = Object.keys(groupedEvents).map(Number).filter(Number.isInteger);
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);

    const groups = [];

    for (let i = minYear; i <= maxYear; i += 1) {
      groups.push(String(i));
    }

    if (groupedEvents[this.ongoingName].length) {
      groups.push(this.ongoingName);
    }

    return groups;
  }

  containerClass() {
    return 'event-list-grouped-year';
  }
}
