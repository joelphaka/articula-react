import React, {useState} from "react";
import AutoComplete from "../ui/AutoComplete";
import useCurrentCallback from "../../hooks/useCurrentCallback";

function SearchBox(props) {
    const {
        searchCallback,
        onSearch,
        showMore,
        maxItems = 15,
        value: inputValue,
        ...rest
    } = props;

    const [response, setResponse] = useState({meta: {}, data: []});
    const [isSearching, setSearching] = useState(false);
    const [value, setValue] = useState(inputValue ?? '');

    const handleChange = useCurrentCallback(isCurrent => async (value) => {
        try {
            if (isCurrent()) {
                setValue(value);
                setSearching(true);
            }

            const {meta, data} = await searchCallback({query: value, per_page: maxItems});

            if (isCurrent()) setResponse({meta, data});
            //if (isFunction(onSearch)) onSearch({value, meta, data});
        } catch (e) {
            console.log(e);
        } finally {
            if (isCurrent()) setSearching(false);
        }
    });

    return (
        <AutoComplete
            suggestions={response.data}
            onChange={handleChange}
            renderLast={() => (
                <React.Fragment>
                    {response.meta.has_more_pages && !isSearching && showMore}
                </React.Fragment>
            )}
            isSubmitEnabled={!!value.trim().length}
            value={value}
            {...rest}
        />
    );
}

export default SearchBox;