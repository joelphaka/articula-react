import React from 'react';

function Spinner(props) {
    const {
        className,
        size = 48,
        thickness = 20,
        theme = "primary",
        style,
    } = props

    return (
        <div className={className} style={{width: `${size}px`, height: `${size}px`, ...style}}>
            <div
                className={`spinner-border text-${theme}`}
                style={{width: '100%', height: '100%', fontSize: `${thickness}px`}}
                role="status"
            >
                <span className="sr-only">Loading...</span>
            </div>
        </div>

    );
}

export default Spinner;