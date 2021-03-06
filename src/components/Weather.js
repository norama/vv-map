import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router-dom';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button } from 'reactstrap';

import { format } from 'date-fns';

import DataChart from './DataChart';
import CalcChart from './CalcChart';
import './Weather.css';

const displayedDate = (str) => (format(new Date(str), 'MMM d'));

const Weather = ({ location, dateRange, name }) => {

    const [ parameters, setParameters ] = useState(false);

    const [ data, setData ] = useState(null);
    const [ activeTab, setActiveTab ] = useState('1');
    const [ activateCalc, setActivateCalc ] = useState(false);

    const toggle = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
            if (!activateCalc) {
                setActivateCalc(true);
            }
        }
    };

    useEffect(() => {
        setParameters(false);
    });

    useEffect(() => {
        setData(null);
        setActiveTab('1');
        setActivateCalc(false);
    }, [ location.lat, location.lng, dateRange.startDate, dateRange.endDate, name ]);

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
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={activeTab === '1' ? 'active' : ''}
                                onClick={() => { toggle('1'); }}
                                disabled={data === null}
                            >
                                Data
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={activeTab === '2' ? 'active' : ''}
                                onClick={() => { toggle('2'); }}
                                disabled={data === null}
                            >
                                Calc
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <h5 className="name" title={name}>{name}</h5>
                    <h5 className="date-range">{displayedDate(dateRange.startDate) + ' - ' + displayedDate(dateRange.endDate)}</h5>
                    <Button color="primary" type="button" onClick={handleParameters} className="button">Parameters</Button>
                </div>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <DataChart location={location} dateRange={dateRange} onDataLoaded={setData} />
                    </TabPane>
                    <TabPane tabId="2">
                        <CalcChart weatherData={activateCalc ? data : null} location={location} dateRange={dateRange} reset={parameters} />
                    </TabPane>
                </TabContent>
                {activeTab === '1' ? (
                    <a href={process.env.REACT_APP_WEATHER_REFERENCE_URL} className="weather-reference" target="_blank" rel="noopener noreferrer">Powered by World Weather Online</a>
                ) : null }
            </div>
        </>
    );
}

Weather.propTypes = {
    location: PropTypes.shape({
        lat: PropTypes.string.isRequired,
        lng: PropTypes.string.isRequired
    }).isRequired,
    dateRange: PropTypes.shape({
        startDate: PropTypes.string.isRequired, // 'yyyy-MM-dd'
        endDate: PropTypes.string.isRequired    // 'yyyy-MM-dd'
    }).isRequired,
    name: PropTypes.string
};

export default Weather;