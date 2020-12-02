import React, {useState} from "react";
import {isFunction} from "lodash";

function SearchInput(props) {
    const {
        className,
        onChange,
        onClick,
        inputClass,
        buttonClass,
        buttonStyle,
        buttonType,
        buttonContent,
        showIcon=true,
        ...rest
    } = props;

    const [value, setValue] = useState('');

    return (
        <div className={`input-group${className?` ${className}`:''}`}>
            <input
                type="text"
                className={`form-control${inputClass?` ${inputClass}`:''}`}
                onChange={e => {
                    if (isFunction(onChange)) {
                        onChange(e, e.currentTarget.value);
                        setValue(e.currentTarget.value);
                    }
                }}
                onKeyPress={(e) => {
                    if(e.key === 'Enter' && isFunction(onClick)) onClick(e, value);
                }}
                {...rest}
            />
            <div className="input-group-append">
                <button
                    className={`btn btn-primary${buttonClass?` ${buttonClass}`:''}`}
                    style={buttonStyle}
                    type={buttonType ?? 'button'}
                    onClick={e => {
                        if (isFunction(onClick)) onClick(e, value)
                    }}>
                    {
                        buttonContent
                            ? buttonContent
                            : showIcon ? (<i className='fa fa-search'></i>) : 'Search'
                    }
                </button>
            </div>
        </div>
    )
}

export default SearchInput;