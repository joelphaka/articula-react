import React, {useState} from "react";
import {isFunction} from "lodash";

function SimpleFilter(props) {
    const {
        filters = [],
        defaultValue,
        className,
        alignMenu = 'right',
        buttonClass = 'btn-outline-dark ',
        buttonText='Filter',
        onFilter,
        ...rest
    } = props;
    const [currentFilter, setCurrentFilter] = useState((filters??[]).filter(f => f.value===defaultValue)[0] ?? null);

    function handleClick(e, filter) {
        setCurrentFilter(filter);

        if (isFunction(onFilter)) onFilter(filter);
    }

    return (
        <div className={`dropdown${className?` ${className}`:''}`}>
            <button
                className={`dropdown-toggle btn btn-sm${buttonClass?` ${buttonClass}`:''}`}
                id="filterMenu"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                {...rest}>
                <i className="fas fa-filter"></i>
                <span className='d-none d-md-inline-block d-xl-inline-block'>&nbsp;{buttonText?buttonText:'Filter'}</span>
            </button>
            <div
                className={`dropdown-menu dropdown-menu-${alignMenu?alignMenu:'right'}`}
                aria-labelledby="filterMenu">
                {
                    filters.map(filter => {
                        return (
                            <button
                                key={filter.value}
                                className="dropdown-item position-relative"
                                onClick={(e) => {handleClick(e, filter)}}>
                                {
                                    currentFilter &&
                                    currentFilter.value === filter.value &&
                                    currentFilter.label === filter.label &&
                                    <i className='fa fa-check position-absolute center-vertical' style={{right:'8px'}}></i>
                                }
                                &nbsp;{filter.label}
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SimpleFilter;