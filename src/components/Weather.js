import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { format } from 'date-fns';

import { Button } from 'reactstrap';

import { useQuery } from '../util/query';

import { START_DATE, END_DATE, LONDON_LATLNG, LONDON_NAME } from './constants';

import Chart from './Chart';

import './Weather.css';

const displayedDate = (str) => (format(new Date(str), 'MMM d'));

const Weather = () => {

    const query = useQuery();

    const [ location ] = useState({
        lat: query.get("lat", LONDON_LATLNG.lat),
        lng: query.get("lng", LONDON_LATLNG.lng)
    });
    const [ dateRange ] = useState({
        startDate: query.get("startDate", START_DATE),
        endDate: query.get("endDate", END_DATE)
    });
    const [ name ] = useState(query.get("name", ""));

    const [ parameters, setParameters ] = useState(false);

    const handleParameters = () => {
        setParameters(true);
    }

    return parameters ? (
        <Redirect to={'/parameters?' + 
            `lat=${location.lat}` + '&' +
            `lng=${location.lng}` + '&' +
            `name=${name}` + '&' +
            `startDate=${dateRange.startDate}` + '&' +
            `endDate=${dateRange.endDate}`
        } />
    ) : (
        <div className="__Weather__">
            <div className="weather-info">
                <h5 className="name">{query.get("name", LONDON_NAME)}</h5>
                <h5 className="date-range">{displayedDate(dateRange.startDate) + ' - ' + displayedDate(dateRange.endDate)}</h5>
                <Button color="primary" type="button" onClick={handleParameters} className="button">Parameters</Button>
            </div>
            <Chart location={location} dateRange={dateRange} />
            <a href="https://www.worldweatheronline.com/developer/" className="weather-reference" target="_blank" rel="noopener">Powered by World Weather Online</a>
        </div>
    );
}

export default Weather;