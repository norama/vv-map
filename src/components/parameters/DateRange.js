import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import { format } from 'date-fns';

import { Button, Popover, PopoverBody } from 'reactstrap';

import './DateRange.css';

const DATE_FORMAT = "MMM d, yyyy";

const DateRange = ({ startDate, endDate, onChange }) => {

    const [popoverOpen, setPopoverOpen] = useState(false);

    const toggle = () => {
        setPopoverOpen((open) => (!open));
    };

    const handleSelect = (item) => {
        onChange(item.selection);
    };

    return (
        <div className="__DateRange__">
            <div className="daterange">
                <h5 className="title">Date range:</h5>
                <div className="range" id="popover">
                    <h5 className="text">{format(startDate, DATE_FORMAT)} - {format(endDate, DATE_FORMAT)}</h5>
                    <Button outline={!popoverOpen} color="secondary" className="change">{popoverOpen ? "Done" : "Change"}</Button>
                </div>
            </div>
            <Popover placement="bottom" isOpen={popoverOpen} target="popover" toggle={toggle}>
                <PopoverBody>
                    <DateRangePicker
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        maxDate={new Date()}
                        months={2}
                        direction="horizontal"
                        ranges={[{ startDate, endDate, key: 'selection' }]}
                        onChange={handleSelect}
                    />
                </PopoverBody>
            </Popover>
        </div>
    );
};

export default DateRange;