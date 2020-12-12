import React, {useState} from 'react';
import ArticleList from "../../../components/article/ArticleList";
import {useCurrentEffect} from "use-current-effect";
import {useDispatch, useSelector} from "react-redux";
import {loadArticles, filterArticles} from "../../../store/articleReducer";
import withMasterLayout from "../../../components/layouts/withMasterLayout";
import SimpleFilter from "../../../components/ui/SimpleFilter";
import useComponentDidUpdate from "../../../hooks/useComponentDidUpdate";
import useWindowSize from "../../../hooks/useWindowSize";
import ListLoader from "../../../components/ui/ListLoader";


function HomePage() {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const {
        articles,
        isFetching,
        isFiltering,
        meta,
        filters,
        currentFilter,
        fetchError
    } = useSelector(state => state.article);
    const [query, setQuery] = useState({
        page: meta.current_page,
        per_page: meta.per_page,
        ...currentFilter.sort
    });
    const {width: windowWidth} = useWindowSize();

    useCurrentEffect(() => {
        if (articles.length === 0) dispatch(loadArticles(query));
    }, []);

    useComponentDidUpdate(() => {
        dispatch(loadArticles(query));
        console.log('Updating...' + `${query.page} - ` + Date.now());
    }, [query])

    return (
        <div className="container py-5">
            <div className="row">
                <div className='col-md-12'>
                    <div className='mt-3 mb-4 d-flex align-items-md-center flex-column flex-md-row'>
                        <h3 className='m-0 font-weight-light'>Articles</h3>
                        <SimpleFilter
                            className='ml-md-auto mt-md-2'
                            defaultValue={currentFilter.value}
                            alignMenu={windowWidth > 767 ? 'right' : 'left'}
                            filters={filters}
                            disabled={isFetching}
                            buttonText={currentFilter.label}
                            onFilter={filter => {
                                dispatch(filterArticles(filter));
                                setQuery(q => Object({...q, page: 1, ...filter.sort}));
                            }}
                        />
                    </div>
                    {
                        isFiltering
                            ? <ListLoader/>
                            : (
                                <ArticleList
                                    articles={articles}
                                    hasMore={meta.last_page > meta.current_page}
                                    isFetching={isFetching}
                                    page={query.page}
                                    onLoadMore={() => {
                                        setQuery(q => Object({...q, page: q.page + 1}))
                                    }}
                                >
                                </ArticleList>
                            )
                    }
                </div>
            </div>
        </div>
    );
}

export default withMasterLayout(HomePage);