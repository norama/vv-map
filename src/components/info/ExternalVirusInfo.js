import React from 'react';
import PropTypes from 'prop-types';

import './ExternalVirusInfo.css';

const COUNTRY_MAP = {
    Czechia: 'czech-republic',
    'S. Korea': 'south-korea',
    USA: 'US'
};

const PROVINCE_MAP = {
    'New York City, NY': 'new-york'
};

function countryMap(country) {
    return COUNTRY_MAP[country] ? COUNTRY_MAP[country] : country;
}

function provinceMap(province) {
    return PROVINCE_MAP[province] ? PROVINCE_MAP[province] : province;
}

const ExternalVirusInfo = ({ country, province }) => (
    <div className="__CountryVirusInfo__">
        <a href={country === 'USA' && province ?
            process.env.REACT_APP_VIRUS_USA_REFERENCE_BASE_URL+'/'+provinceMap(province) :
            process.env.REACT_APP_VIRUS_COUNTRY_REFERENCE_BASE_URL+'/'+countryMap(country)}
            target="_blank" rel="noopener noreferrer"
        >
            {country === 'USA' && province ? province : country} virus data
        </a>
    </div>
);

ExternalVirusInfo.propTypes = {
    country: PropTypes.string.isRequired,
    province: PropTypes.string
};

export default ExternalVirusInfo;