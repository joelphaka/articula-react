import React, {useEffect, useRef, useState} from "react";

function ItemButton(props) {
    const {
        className,
        style,
        children,
        ...rest
    } = props;

    return (
        <button
            className={`btn${className?` ${className}`:''}`}
            style={{borderRadius: '20%', padding: '2px 6px', ...style}}
            {...rest}>
            {children}
        </button>
    )
}

export default ItemButton;