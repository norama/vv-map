import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import { addDays, format } from 'date-fns';

import { Button, Popover, PopoverBody } from 'reactstrap';

import './DateRange.css';

const DATE_FORMAT = "MMM d, yyyy";
const START_DATE = new Date('2020-03-01');
const END_DATE = new Date('2020-03-31');

const DateRange = () => {

    const [state, setState] = useState([{
          startDate: START_DATE,
          endDate: END_DATE,
          key: 'selection'
    }]);

    const [popoverOpen, setPopoverOpen] = useState(false);

    const toggle = () => {
        setPopoverOpen((open) => (!open));
    };

    const handleSelect = (item) => {
        console.log(item.selection);
        setState([item.selection]);
    };

    return (
        <div className="__DateRange__">
            <div className="daterange">
                <h5 className="title">Date range:</h5>
                <div className="range" id="popover">
                    <h5 className="text">{format(START_DATE, DATE_FORMAT)} - {format(END_DATE, DATE_FORMAT)}</h5>
                    <Button outline={!popoverOpen} color="secondary" className="change">{popoverOpen ? "Done" : "Change"}</Button>
                </div>
            </div>
            <Popover placement="bottom" isOpen={popoverOpen} target="popover" toggle={toggle}>
                <PopoverBody>
                    <DateRangePicker
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={2}
                        direction="horizontal"
                        ranges={state}
                        onChange={handleSelect}
                    />
                </PopoverBody>
            </Popover>
        </div>
    );
};

export default DateRange;