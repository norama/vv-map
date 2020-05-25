import React, { useState, useEffect } from 'react';
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

    const reference = activeTab === '1' ? {
        url: process.env.REACT_APP_WEATHER_REFERENCE_URL,
        text: 'Powered by World Weather Online'
    } : {
        url: process.env.REACT_APP_METEO_ARTICLE_URL,
        text: 'Reference: Roles of meteorological conditions in COVID-19 transmission on a worldwide scale'
    };

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
                        <CalcChart weatherData={activateCalc ? data : null} location={location} dateRange={dateRange} />
                    </TabPane>
                </TabContent>
            <a href={reference.url} className="weather-reference" target="_blank" rel="noopener noreferrer">{reference.text}</a>
            </div>
        </>
    );
}

export default Weather;