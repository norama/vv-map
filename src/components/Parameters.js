import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { format } from 'date-fns';

import { Button } from 'reactstrap';

import { useQuery } from '../util/query';

import DateRange from './parameters/DateRange';
import Location from './parameters/Location';

import { START_DATE, END_DATE, LONDON_LATLNG, LONDON_NAME } from './constants';

import './Parameters.css';


const Parameters = () => {
    const [ weather, setWeather ] = useState(false);

    const query = useQuery();

    const startDate = new Date(query.get("startDate", START_DATE));
    const endDate = new Date(query.get("endDate", END_DATE));

    const latlng = [ parseFloat(query.get("lat", LONDON_LATLNG.lat)), parseFloat(query.get("lng", LONDON_LATLNG.lng)) ];
    const name = query.get('name', LONDON_NAME);

    const [ dateRange, setDateRange ] = useState({
        startDate,
        endDate
    });
    const [ location, setLocation ] = useState({
        latlng,
        name
    });

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
            <Location latlng={latlng} query={name} onChange={setLocation} />
        </div>
    );
};

export default Parameters;