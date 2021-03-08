import React from "react";
import PropTypes from 'prop-types';
import useWindowSize from "../../hooks/useWindowSize";

function ResponsiveView({name, children, ...rest}) {
    let {minWidth, maxWidth, between} = rest;
    const {width: windowWidth} = useWindowSize();

    if (between) {
        [minWidth, maxWidth] = between;

        return (windowWidth >= minWidth && windowWidth <= maxWidth) ? children : null;
    }

    if ((minWidth && windowWidth >= minWidth) || (maxWidth && windowWidth <= maxWidth)) {
        return children
    }

    return null;
}


ResponsiveView.propTypes = {
    minWidth: PropTypes.number,
    maxWidth: PropTypes.number,
    between: PropTypes.array
}

export default ResponsiveView;