import React from 'react';

// Styles
import './wrapper.scss'

const Wrapper = (props) => {
    return (
        <div className='Wrapper'>
            <h1>{props.wrapperTitle}</h1>
            <p>{props.wrapperDescription}</p>
        </div>
    );
};

export default Wrapper;