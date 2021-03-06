import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router';

import { Button } from 'reactstrap';

import { dateString } from '../util/date';

import DateRange from './parameters/DateRange';
import Location from './parameters/Location';

import './Parameters.css';

const Parameters = ({ location, dateRange, name }) => {

    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);

    const latlng = [ parseFloat(location.lat), parseFloat(location.lng) ];

    const [ newDateRange, setNewDateRange ] = useState({
        startDate,
        endDate
    });
    const [ newLocation, setNewLocation ] = useState({
        latlng,
        name
    });

    const [ state, setState ] = useState({ weather: false, popoverOpen: false });

    const handleTogglePopover = (e) => {
        e.stopPropagation();

        setState((state) => ({
            weather: false,
            popoverOpen: !state.popoverOpen
        }));
    };

    const handleClosePopover = (e) => {
        e.stopPropagation();

        setState((state) => ({
            weather: false,
            popoverOpen: false
        }));
    };

    useEffect(() => {
        setState({
            weather: false,
            popoverOpen: false
        });
    }, [ location, dateRange, name ]);

    const handleWeather = (e) => {
        e.stopPropagation();

        setState({
            weather: true,
            popoverOpen: false
        });
    }

    return (
        <>
            { state.weather ?
                <Redirect to={'/?' +
                    `lat=${newLocation.latlng[0].toFixed(3)}` + '&' +
                    `lng=${newLocation.latlng[1].toFixed(3)}` + '&' +
                    `name=${newLocation.name}` + '&' +
                    `startDate=${dateString(newDateRange.startDate)}` + '&' +
                    `endDate=${dateString(newDateRange.endDate)}`}
                /> : null }
            <div className="__Parameters__" onClick={handleClosePopover}>
                <div className="weather-button">
                    <DateRange
                        startDate={newDateRange.startDate}
                        endDate={newDateRange.endDate}
                        onChange={setNewDateRange}
                        popoverOpen={state.popoverOpen}
                        onTogglePopover={handleTogglePopover}
                    />
                    <Button color="primary" className="button" onClick={handleWeather}>Charts</Button>
                </div>
                <Location latlng={newLocation.latlng} query={newLocation.name} onChange={setNewLocation} />
            </div>
        </>
    );
};

Parameters.propTypes = {
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

export default Parameters;