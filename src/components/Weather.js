import React, { useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { format } from 'date-fns';

import { Button } from 'reactstrap';

import Chart from './Chart';

import './Weather.css';

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Weather = () => {

    const query = useQuery();

    const [ parameters, setParameters ] = useState(false);

    const handleParameters = () => {
        setParameters(true);
    }

    const formatDate = (str) => (format(new Date(str), 'MMM d'));
    
    return parameters ? (
        <Redirect to='/parameters' />
    ) : (
        <div className="__Weather__">
            <div className="weather-info">
                <h5 className="name">{query.get("name")}</h5>
                <h5 className="date-range">{formatDate(query.get("startDate")) + ' - ' + formatDate(query.get("endDate"))}</h5>
                <Button color="primary" type="button" onClick={handleParameters} className="button">Parameters</Button>
            </div>
            <Chart
                location={{ lat: query.get("lat"), lng: query.get("lng") }}
                dateRange={{ startDate: query.get("startDate"), endDate: query.get("endDate") }}
            />
        </div>
    );
}

export default Weather;