import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import withMasterLayout from "../../components/layouts/withMasterLayout";
import ArticleSearchBox from "../../components/search/ArticleSearchBox";
import useQueryParams from "../../hooks/useQueryParams";
import ArticleList from "../../components/article/ArticleList";
import {useDispatch, useSelector} from "react-redux";
import {searchArticles, filterSearchedArticles} from "../../store/searchReducer";
import useComponentDidUpdate from "../../hooks/useComponentDidUpdate";
import {stringifyUrl} from "query-string";
import SearchLayout from "../../components/layouts/SearchLayout";
import SimpleFilter from "../../components/ui/SimpleFilter";
import {ARTICLE_FILTERS} from "../../store/common";
import useStateIfMounted from "../../hooks/useStateIfMounted";

function SearchArticlesPage() {
    const {
        isSearchingArticles,
        articles,
        meta,
        currentFilter,
        error,
    } = useSelector(state => state.search.articleSearch)
    const history = useHistory();
    const dispatch = useDispatch();
    const {q} = useQueryParams();
    const [query, setQuery] = useStateIfMounted(() => Object({
        'query': q ?? '',
        page: meta.current_page,
        per_page: meta.per_page,
        ...currentFilter.sort
    }));
    const searchPath = '/search/articles';

    useEffect(() => {
        if (!!query.query?.trim()) dispatch(searchArticles(query));
    }, []);

    const handleValueUpdate = v => setQuery(p => Object({...p, page: 1, 'query': v}));

    useComponentDidUpdate(() => handleValueUpdate(q), [q])
    useComponentDidUpdate(() => dispatch(searchArticles(query)), [query]);

    const handleSubmit = ({target: {value}}) => history.push(stringifyUrl({
        url: searchPath,
        query: {q: value}
    }));

    return (
        <SearchLayout
            query={query.query}
            isSearching={isSearchingArticles}
            input={
                <ArticleSearchBox
                    value={query.query}
                    isShowMoreVisible={false}
                    onSubmit={handleSubmit}
                />
            }
            hasResults={!!articles.length}>
            <div>
                <div className='mb-3 d-flex'>
                    {
                        !!articles.length &&
                        <SimpleFilter
                            className='ml-auto'
                            defaultValue={currentFilter.value}
                            filters={ARTICLE_FILTERS}
                            disabled={isSearchingArticles}
                            buttonText={currentFilter.label}
                            onFilter={filter => {
                                dispatch(filterSearchedArticles(filter));
                                setQuery(q => Object({...q, page: 1, ...filter.sort}));
                            }}
                        />
                    }
                </div>
                <ArticleList
                    articles={articles}
                    hasMore={meta.has_more_pages && !error}
                    isFetching={isSearchingArticles}
                    page={query.page}
                    onLoadMore={() => setQuery(q => Object({...q, page: q.page + 1}))}
                />
            </div>
        </SearchLayout>
    )
}

export default withMasterLayout(SearchArticlesPage);