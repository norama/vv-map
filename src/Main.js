import React from 'react';
import {
    HashRouter as Router,
    Route
} from "react-router-dom";

import { useQueryParams } from './util/query';

import Weather from './components/Weather';
import Parameters from './components/Parameters';

let key = 0;

// workaround for leaflet map init:
// create map when it is first shown with display: block,
// ignore mini-map created initially with diaply: none
function getParametersKey(match) {
    if (key) {
        return key;
    }
    if (match) {
        key = 1;
    }
    return key;
}

const Main = () => {

    return (
        <Router basename='/'>
            <div>
                <Route path="/parameters" exact children={({ match, ...rest }) => (
                    <ShowOnMatch key={getParametersKey(match)} match={match}>
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