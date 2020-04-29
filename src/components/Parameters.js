import React, { useState } from 'react';
import { Redirect } from 'react-router';

import { Button } from 'reactstrap';

import DateRange from './parameters/DateRange';
import Location from './parameters/Location';

import './Parameters.css';

const Parameters = () => {
    const [ weather, setWeather ] = useState(false);

    const handleWeatherClick = () => {
        setWeather(true);
    }

    return weather ? (
        <Redirect to='/' />
    ) : (
        <div className="__Parameters__">
            <div className="weather-button">
                <DateRange />
                <Button color="primary" className="button" onClick={handleWeatherClick}>Show Weather</Button>
            </div>
            <Location onLocationChange={(latlng) => { console.log('latlng', latlng); }} />
        </div>
    );
};

export default Parameters;