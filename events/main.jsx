import React from 'react';
import ReactDOM from 'react-dom';
import YearGroupedEventList from './year-grouped-event-list.jsx';
import CountryGroupedEventList from './country-grouped-event-list.jsx';

if (window.IMAGINARY === undefined) {
  window.IMAGINARY = {};
}

window.IMAGINARY.YearGroupedEventList = function initYearGroupedEventList(container, data) {
  ReactDOM.render(
    <YearGroupedEventList events={data} />,
    container
  );
};

window.IMAGINARY.CountryGroupedEventList = function initCountryGroupedEventList(container, data) {
  ReactDOM.render(
    <CountryGroupedEventList events={data} enableSort />,
    container
  );
};
