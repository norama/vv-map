import React, { useState } from 'react';
import { Redirect } from 'react-router';

import { Button } from 'reactstrap';

import { dateString } from '../util/date';

import DateRange from './parameters/DateRange';
import Location from './parameters/Location';

import './Parameters.css';

const Parameters = ({ location, dateRange, name }) => {

    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);

    const latlng = [ parseFloat(location.lat), parseFloat(location.lng) ];

    const [ newDateRange, setNewDateRange ] = useState({
        startDate,
        endDate
    });
    const [ newLocation, setNewLocation ] = useState({
        latlng,
        name
    });

    const [ weather, setWeather ] = useState(false);

    const handleWeatherClick = () => {
        setWeather(true);
    }

    return weather ? (
        <Redirect to={'/?' +
            `lat=${newLocation.latlng[0].toFixed(3)}` + '&' +
            `lng=${newLocation.latlng[1].toFixed(3)}` + '&' +
            `name=${newLocation.name}` + '&' +
            `startDate=${dateString(newDateRange.startDate)}` + '&' +
            `endDate=${dateString(newDateRange.endDate)}`
        } />
    ) : (
        <div className="__Parameters__">
            <div className="weather-button">
                <DateRange startDate={newDateRange.startDate} endDate={newDateRange.endDate} onChange={setNewDateRange} />
                <Button color="primary" className="button" onClick={handleWeatherClick}>Show Weather</Button>
            </div>
            <Location latlng={newLocation.latlng} query={newLocation.name} onChange={setNewLocation} />
        </div>
    );
};

export default Parameters;