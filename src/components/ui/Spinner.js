import React from 'react';

function Spinner(props) {
    const {
        className,
        wrapperClass = '',
        size = 48,
        thickness = 20,
        theme = "primary"
    } = props

    return (
        <div className={wrapperClass} style={{width: `${size}px`, height: `${size}px`}}>
            <div
                className={`spinner-border text-${theme}${className ? ` ${className}` : ''}`}
                style={{width: '100%', height: '100%', fontSize: `${thickness}px`}}
                role="status"
            >
                <span className="sr-only">Loading...</span>
            </div>
        </div>

    );
}

export default Spinner;