import React from 'react';

import './CountryVirusInfo.css';

const CountryVirusInfo = ({ country }) => (
    <div className="__CountryVirusInfo__">
        <a href={process.env.REACT_APP_VIRUS_COUNTRY_REFERENCE_BASE_URL+'/'+country} target="_blank" rel="noopener noreferrer">{country} virus data</a>
    </div>
);

export default CountryVirusInfo;