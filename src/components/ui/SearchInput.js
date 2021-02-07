import React, {useState, forwardRef} from "react";
import {isFunction} from "lodash";

const SearchInput = forwardRef((props, ref) => {
    const {
        className,
        onChange,
        onClick,
        inputClass,
        buttonClass,
        buttonStyle,
        buttonType,
        buttonContent,
        isButtonEnabled = true,
        showIcon = true,
        style,
        ...rest
    } = props;

    const [value, setValue] = useState(() => props.value === undefined || props.value === null ? '' : props.value);

    return (
        <div className={className} style={style}>
            <div className={`input-group`}>
                <input
                    ref={ref}
                    type="text"
                    className={`form-control${inputClass ? ` ${inputClass}` : ''}`}
                    value={value}
                    onChange={e => {
                        setValue(e.currentTarget.value);
                        e.persist();
                        if (isFunction(onChange)) onChange(e, e.currentTarget.value);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter' && isFunction(onClick)) onClick(e, value);
                    }}
                    {...rest}
                />
                <div className="input-group-append">
                    <button
                        className={`btn btn-primary${buttonClass ? ` ${buttonClass}` : ''}`}
                        style={buttonStyle}
                        type={buttonType ?? 'button'}
                        disabled={!isButtonEnabled}
                        onClick={(e) => {
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
        </div>
    )
});

export default SearchInput;