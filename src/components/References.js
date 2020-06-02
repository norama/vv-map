import React, { useState } from 'react';

import { Button, Popover, PopoverBody, Card, CardBody } from 'reactstrap';

import './References.css';

function preventEventPropagation(e) {
    e.stopPropagation();
}

const References = () => {

    const [ popoverOpen, setPopoverOpen ] = useState(false);

    const handleTogglePopover = () => {
        setPopoverOpen((open) => (!open));
    };

    return (
        <div className="__References__">
            <div className="references" id="references"><Button color="link">References</Button></div>
            <Popover placement="top" isOpen={popoverOpen} target="references" toggle={handleTogglePopover}>
                <PopoverBody onClick={preventEventPropagation}>
                    <Card>
                        <CardBody className="references-popup">
                            <h3>Virus data</h3>
                            <ul>
                                <li>Data per country:<br/><a href="https://about-corona.net/documentation" target="_blank" rel="noopener noreferrer">corona-api</a></li>
                                <li>Data per province / USA city:<br/><a href="https://covid-api.com/api" target="_blank" rel="noopener noreferrer">covid-api</a></li>
                            </ul> 
                            <h3>Meteorological approximations (with / without visibility)</h3>
                            <a href={process.env.REACT_APP_METEO_ARTICLE_URL} target="_blank" rel="noopener noreferrer">Roles of meteorological conditions in COVID-19 transmission on a worldwide scale</a>
                        </CardBody>
                    </Card>
                </PopoverBody>
            </Popover>
        </div>
    );
};

export default References;