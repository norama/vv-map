import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { format } from 'date-fns';

import { Button } from 'reactstrap';
import Chart from './Chart';
import './Weather.css';

const displayedDate = (str) => (format(new Date(str), 'MMM d'));

const Weather = ({ location, dateRange, name }) => {

    const [ parameters, setParameters ] = useState(false);

    useEffect(() => {
        setParameters(false);
    });

    const handleParameters = () => {
        setParameters(true);
    }

    return (
        <>
            { parameters ? 
                <Redirect to={'/parameters?' + 
                    `lat=${location.lat}` + '&' +
                    `lng=${location.lng}` + '&' +
                    `name=${name}` + '&' +
                    `startDate=${dateRange.startDate}` + '&' +
                    `endDate=${dateRange.endDate}`}
                /> : null }
            <div className="__Weather__">
                <div className="weather-info">
                    <h5 className="name" title={name}>{name}</h5>
                    <h5 className="date-range">{displayedDate(dateRange.startDate) + ' - ' + displayedDate(dateRange.endDate)}</h5>
                    <Button color="primary" type="button" onClick={handleParameters} className="button">Parameters</Button>
                </div>
                <Chart location={location} dateRange={dateRange} />
                <a href={process.env.REACT_APP_WEATHER_REFERENCE_URL} className="weather-reference" target="_blank" rel="noopener noreferrer">Powered by World Weather Online</a>
            </div>
        </>
    );
}

export default Weather;