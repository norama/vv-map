import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { Button } from 'reactstrap';

import Chart from './Chart';

import './Weather.css';

const Weather = () => {

    const [ parameters, setParameters ] = useState(false);

    const handleParameters = () => {
        setParameters(true);
    }
    
    return parameters ? (
        <Redirect to='/parameters' />
    ) : (
        <div className="__Weather__">
            <div className="weather-button">
                <Button color="primary" type="button" onClick={handleParameters} className="button">Parameters</Button>
            </div>
            <Chart />
        </div>
    );
}

export default Weather;