import React from 'react';
import {
    HashRouter as Router,
    Route
} from "react-router-dom";

import { useQueryParams } from './util/query';

import Weather from './components/Weather';
import Parameters from './components/Parameters';

const Main = () => {

    return (
        <Router basename='/'>
            <div>
                <Route path="/parameters" exact children={({ match, ...rest }) => (
                    <ShowOnMatch match={match}>
                        <ParametersPage {...rest} />
                    </ShowOnMatch>
                )} />
                <Route path="/" exact children={({ match, ...rest }) => (
                    <ShowOnMatch match={match}>
                        <WeatherPage {...rest} />
                    </ShowOnMatch>
                )} />
            </div>
        </Router>
    );
};

const ShowOnMatch = ({ match, children }) => (
    <div style={ match ? { display: "block" } : { display: "none" }}>
        {children}
    </div>
);

const ParametersPage = () => {
    const queryParams = useQueryParams();

    return (
        <Parameters {...queryParams} />
    );
};

const WeatherPage = () => {
    const queryParams = useQueryParams();

    return (
        <Weather {...queryParams} />
    );
};

export default Main;