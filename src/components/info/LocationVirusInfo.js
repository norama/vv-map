import React from 'react';
import PropTypes from 'prop-types';

import { Badge } from 'reactstrap';

import './LocationVirusInfo.css';

function formatPopulation(population) {
    return population ? population.toLocaleString() : null;
}

const DataBadge = ({ color, data }) => data ? (
    <h3><Badge color={color}>{data}</Badge></h3>
) : null;

const LocationVirusInfo = ({ country, province, city, population }) => (
    <div className="__LocationVirusInfo__">
        <div className="label">Virus data for</div>
        <div className="data country"><DataBadge color="secondary" data={country} /></div>
        <div className="data province"><DataBadge color="info" data={province} /></div>
        <div className="data city"><DataBadge color="danger" data={city} /></div>
        <div className="label">{population ? 'Population:' : null}</div>
        <div className="data population">{formatPopulation(population)}</div>
    </div>
);

LocationVirusInfo.propTypes = {
    country: PropTypes.string.isRequired,
    province: PropTypes.string,
    city: PropTypes.string,
    population: PropTypes.number
};

export default LocationVirusInfo;