import React, {useState} from "react";
import SearchBox from "./SearchBox";
import {searchArticles} from "../../services/api/search-service";
import {Link} from "react-router-dom";
import {stringifyUrl} from "query-string";
import useCurrentCallback from "../../hooks/useCurrentCallback";

function ArticleSearchBox(props) {
    const {
        isShowMoreVisible = true,
        value: inputValue,
        ...rest
    } = props;
    const [value, setValue] = useState(inputValue);

    const handleSearch = useCurrentCallback(isCurrent =>({value: v}) =>{
        if (isCurrent()) setValue(v)
    });

    return (
        <SearchBox
            searchCallback={searchArticles}
            itemClass='list-group-item p-0'
            maxHeight={300}
            getDisplayValue={(article) => article.title}
            activeClass='active'
            value={value}
            onSearch={handleSearch}
            renderItem={(article, isActive) => (
                <Link
                    to={`/article/${article.title_id}`}
                    className={`no-underline d-flex align-items-center px-2 py-1 ${isActive?'text-light':'text-dark'}`}
                    title={article.title}>
                    <div className='ml-1 overflow-ellipsis'>{article.title}</div>
                </Link>
            )}
            showMore={(
                !isShowMoreVisible
                    ? null
                    : (
                        <Link
                            to={stringifyUrl({url: '/search/articles', query: {q:value}})}
                            className='btn btn-light btn-outline-secondary btn-block btn-sm text-uppercase'
                            style={{padding: '1px'}}>
                            Show more
                        </Link>
                    )
            )}
            {...rest}
        />
    )
}

export default ArticleSearchBox;