import React from 'react';
import PropTypes from 'prop-types';

import { DotLoader } from 'react-spinners';

import './Loader.css';

const Loader = ({ size, loading }) => {

    return (
        <div className="__Loader__">
            <DotLoader
                sizeUnit={"px"}
                color={'#5ac584'}
                size={size}
                loading={loading}
            />
        </div>
    );
};

Loader.defaultProps = {
    size: 200,
    loading: false
};

Loader.propTypes = {
    size: PropTypes.number,
    loading: PropTypes.bool
};

export default Loader;