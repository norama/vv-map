import React from 'react';

import DateRange from './parameters/DateRange';
import Location from './parameters/Location';

const Parameters = () => {
    return (
        <div>
            <DateRange />
            <Location onLocationChange={(latlng) => { console.log('latlng', latlng); }} />
        </div>
    );
};

export default Parameters;