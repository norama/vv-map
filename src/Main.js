import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Chart from './components/Chart';
import Parameters from './components/Parameters';

const Main = () => {

    return (
        <Router>
            <Switch>
                <Route path="/parameters">
                    <Parameters />
                </Route>
                <Route path="/">
                    <Chart />
                </Route>
            </Switch>
      </Router>  
    );
};

export default Main;