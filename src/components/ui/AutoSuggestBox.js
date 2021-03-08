import React, {useState} from "react";
import AutoComplete from "../ui/AutoComplete";
import {isFunction, isObject} from "lodash";

function AutoSuggestBox(props) {
    const {
        suggestions = [],
        getFilerValue,
        ...rest
    } = props;
    const [filteredSuggestions, setFilteredSuggestions] = useState(() => []);

    const handleFilterValue = (item) => {
        if (isFunction(getFilerValue)) return getFilerValue(item);

        return isObject(item) ? JSON.stringify(item) : item;
    };

    const handleChange = async (value) => {

        setFilteredSuggestions(() => {
            return !value.trim().length ? [] : suggestions.filter(item => {
                return handleFilterValue(item).toLowerCase().includes(value.toLowerCase());
            });
        })
    };

    return (
        <AutoComplete
            onChange={handleChange}
            suggestions={filteredSuggestions}
            {...rest}
        />
    );
}

export default AutoSuggestBox;