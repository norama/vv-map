import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Weather from './components/Weather';
import Parameters from './components/Parameters';

const Main = () => {

    return (
        <Router>
            <Switch>
                <Route path="/parameters">
                    <Parameters />
                </Route>
                <Route path="/">
                    <Weather />
                </Route>
            </Switch>
      </Router>  
    );
};

export default Main;