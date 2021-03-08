import React, {useRef} from "react";
import PropTypes from 'prop-types';
import {isFunction, isObject} from "lodash";
import SearchInput from "./SearchInput";
import useDebounce from "../../hooks/useDebounce";
import useCurrentEffect from "../../hooks/useCurrentEffect";
import useStateIfMounted from "../../hooks/useStateIfMounted";

function AutoComplete(props) {
    const {
        suggestions = [],
        className,
        listClass = 'suggestion-list list-group',
        itemClass = 'suggestion-item list-group-item px-3 py-1 text-truncate',
        activeClass = 'active',
        activeStyle,
        style,
        listStyle,
        itemStyle,
        maxHeight,
        isSubmitEnabled = true,
        renderItem,
        getDisplayValue,
        renderLast,
        onChange,
        onSubmit,
        onItemClick,
        value: inputValue,
    } = props;

    const debounce = useDebounce();
    const [isSuggestionOpen, setSuggestionOpen] = useStateIfMounted(false);
    const [value, setValue] = useStateIfMounted(inputValue ?? '');
    const [activeIndex, setActiveIndex] = useStateIfMounted(-1);
    const inputRef = useRef();

    useCurrentEffect((isCurrent) => {
        if (isCurrent() && suggestions.length && !!value) setSuggestionOpen(true);
    }, [suggestions, value])

    const debounceSetSuggestionOpen = v => debounce(() => setSuggestionOpen(v));

    const handleDisplayValue = (suggestion) => {
        if (isFunction(getDisplayValue)) return getDisplayValue(suggestion);

        return (isObject(suggestion)) ? JSON.stringify(suggestion) : suggestion;
    };

    const handleChange = async (e) => {
        setValue(e.target.value);

        if (isFunction(onChange)) await onChange(e.target.value)
    };

    const handleSubmit = (e) => {
        if (isSubmitEnabled && isFunction(onSubmit)) {
            e.persist();
            setSuggestionOpen(false);
            e.target = inputRef.current;
            onSubmit(e);
        }
    };

    const handleFocus = ({target}) => {
        if (!!suggestions.length && !!target.value.trim().length) {
            setSuggestionOpen(true);
        }
    };

    const handleKeyDown = e => {
        if (!suggestions.length || ![38, 40].some(k => k === e.keyCode) || !isSuggestionOpen) return;

        let index;

        if (e.keyCode === 38) {
            index = activeIndex <= 0 ? (suggestions.length - 1) : (activeIndex - 1);
        } else if (e.keyCode === 40) {
            index = (activeIndex + 1) % suggestions.length;
        }

        setValue(handleDisplayValue(suggestions[index]));
        setActiveIndex(index);
    };

    const handleItemClick = (suggestion, index) => {
        setValue(handleDisplayValue(suggestion));
        setActiveIndex(index);

        if (isFunction(onItemClick)) onItemClick(suggestion, index);

        setSuggestionOpen(false);
    };

    return (
        <React.Fragment>
            <div className={className} style={{position: 'relative', ...style}}>
                <SearchInput
                    ref={inputRef}
                    className='w-100'
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={() => debounceSetSuggestionOpen(false)}
                    onKeyDown={handleKeyDown}
                    onClick={handleSubmit}
                    isButtonEnabled={isSubmitEnabled}
                    value={value}
                />
                {
                    isSuggestionOpen &&
                    <div className='suggestion-box bg-transparent position-absolute w-100' style={{zIndex: '1029'}}>
                        <div
                            className={`mt-1${listClass ? ` ${listClass}` : ''}`}
                            style={{maxHeight: `${maxHeight?`${maxHeight}px`:'auto'}`, ...listStyle, overflowY: 'auto'}}>
                            {
                                suggestions.map((suggestion, i) => (
                                    <div
                                        key={i}
                                        className={`${itemClass ? `${itemClass} ` : ''}${activeClass && activeIndex === i ? `${activeClass} ` : ''}`}
                                        style={{
                                            cursor: 'pointer',
                                            ...itemStyle,
                                            ...(activeIndex === i && activeStyle ? activeStyle : {})
                                        }}
                                        onClick={() => handleItemClick(suggestion, i)}>
                                        {
                                            isFunction(renderItem)
                                                ? renderItem(suggestion, activeIndex === i)
                                                : handleDisplayValue(suggestion)
                                        }
                                    </div>
                                ))
                            }
                        </div>
                        {isFunction(renderLast) && renderLast()}
                    </div>
                }
            </div>
        </React.Fragment>
    );
}

AutoComplete.propTypes = {
    suggestions: PropTypes.array,
}

export default AutoComplete;