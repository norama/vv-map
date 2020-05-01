import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { format } from 'date-fns';

import { Button } from 'reactstrap';

import DateRange from './parameters/DateRange';
import Location from './parameters/Location';

import './Parameters.css';

const START_DATE = new Date('2020-03-01');
const END_DATE = new Date('2020-03-31');

const LONDON_LATLNG = [51.533,-0.129];
const LONDON_QUERY = "London";

const Parameters = () => {
    const [ weather, setWeather ] = useState(false);

    const [ dateRange, setDateRange ] = useState({ startDate: START_DATE, endDate: END_DATE });
    const [ location, setLocation ] = useState({ latlng: LONDON_LATLNG, name: LONDON_QUERY });

    const handleWeatherClick = () => {
        setWeather(true);
    }

    return weather ? (
        <Redirect to={'/?' +
            `lat=${location.latlng[0].toFixed(3)}` + '&' +
            `lng=${location.latlng[1].toFixed(3)}` + '&' +
            `name=${location.name}` + '&' +
            `startDate=${format(dateRange.startDate, 'yyyy-MM-dd')}` + '&' +
            `endDate=${format(dateRange.endDate, 'yyyy-MM-dd')}`
        } />
    ) : (
        <div className="__Parameters__">
            <div className="weather-button">
                <DateRange startDate={dateRange.startDate} endDate={dateRange.endDate} onChange={setDateRange} />
                <Button color="primary" className="button" onClick={handleWeatherClick}>Show Weather</Button>
            </div>
            <Location latlng={LONDON_LATLNG} query={LONDON_QUERY} onChange={setLocation} />
        </div>
    );
};

export default Parameters;