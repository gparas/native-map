import React from 'react';
import getVenues from './getVenues';
import FoursquareMap from './FoursquareMap';

export default () => {
  getVenues().then(({ venues, latitude, longitude }) => {
    render(<FoursquareMap venues={venues} center={{ latitude, longitude }} />);
  });
};
