import React from 'react';

import { DotLoader } from 'react-spinners';

import './Loader.css';

const Loader = ({ size, loading }) => {

    return (
        <div className="__Loader__">
            <DotLoader
                sizeUnit={"px"}
                color={'#5ac584'}
                size={size ? size : 200}
                loading={loading}
            />
        </div>
    );
};

export default Loader;