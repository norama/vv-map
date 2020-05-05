import React, { useState, useEffect } from 'react';
import {
    HashRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import { useQueryParams } from './util/query';

import Weather from './components/Weather';
import Parameters from './components/Parameters';
import Chart from './components/Chart';

const Main = () => {

    const [ chartParams, setChartParams ] = useState({ location: null, dateRange: null });

    return (
        <Router basename='/'>
            <Switch>
                <Route path="/parameters" >
                    <ParametersPage setChartParams={setChartParams} />
                </Route>
                <Route path="/" >
                    <WeatherPage setChartParams={setChartParams} />
                </Route>
            </Switch>
            <div style={chartParams ? { display: "block" } : { display: "none" }}>
                <Chart location={chartParams.location} dateRange={chartParams.dateRange} />
            </div>
        </Router>  
    );
};

const ParametersPage = ({ setChartParams }) => {
    const queryParams = useQueryParams();

    useEffect(() => {
        setChartParams({ location: null, dateRange: null });
    }, []);

    return (
        <Parameters {...queryParams} />
    );
};

const WeatherPage = ({ setChartParams }) => {
    const queryParams = useQueryParams();

    useEffect(() => {
        setChartParams(queryParams);
    }, []);

    return (
        <Weather {...queryParams} />
    );
};

export default Main;