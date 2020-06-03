import React from 'react';

import './ExternalVirusInfo.css';

const ExternalVirusInfo = ({ country, province }) => (
    <div className="__CountryVirusInfo__">
        <a href={country === 'USA' ?
            process.env.REACT_APP_VIRUS_USA_REFERENCE_BASE_URL+'/'+province : 
            process.env.REACT_APP_VIRUS_COUNTRY_REFERENCE_BASE_URL+'/'+country}
            target="_blank" rel="noopener noreferrer"
        >
            {country === 'USA' ? province : country} virus data
        </a>
    </div>
);

export default ExternalVirusInfo;