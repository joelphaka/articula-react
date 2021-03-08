import React from "react";
import AutoComplete from "../ui/AutoComplete";
import useStateIfMounted from "../../hooks/useStateIfMounted";

function SearchBox(props) {
    const {
        searchCallback,
        onSearch,
        showMore,
        maxItems = 15,
        value: inputValue,
        ...rest
    } = props;

    const [response, setResponse] = useStateIfMounted({meta: {}, data: []});
    const [isSearching, setSearching] = useStateIfMounted(false);
    const [value, setValue] = useStateIfMounted(inputValue ?? '');

    const handleChange = async (value) => {
        try {
            setValue(value);
            setSearching(true);

            const {meta, data} = await searchCallback({query: value, per_page: maxItems});

            setResponse({meta, data});
        } catch (e) {
            console.log(e);
        } finally {
            setSearching(false);
        }
    };

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