import React from 'react';

import './ExternalVirusInfo.css';

const MAP = {
    Czechia: 'czech-republic',
    'S. Korea': 'south-korea'
};

function countryMap(country) {
    return MAP[country] ? MAP[country] : country;
}

const ExternalVirusInfo = ({ country, province }) => (
    <div className="__CountryVirusInfo__">
        <a href={country === 'USA' ?
            process.env.REACT_APP_VIRUS_USA_REFERENCE_BASE_URL+'/'+province : 
            process.env.REACT_APP_VIRUS_COUNTRY_REFERENCE_BASE_URL+'/'+countryMap(country)}
            target="_blank" rel="noopener noreferrer"
        >
            {country === 'USA' ? province : country} virus data
        </a>
    </div>
);

export default ExternalVirusInfo;